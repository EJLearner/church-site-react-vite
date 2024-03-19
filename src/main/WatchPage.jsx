import React, {useState} from 'react';
import styled from 'styled-components';

import choir from '../assets/images/choir.jpg';
import sermonVideos from '../stores/sermonVideos';
import constants from '../utils/constants';
import {
  convertTypedDateToIso,
  getLongDisplayDate,
} from '../utils/dateTimeUtils';

import WatchPageFilter from './WatchPageFilter';
import MainMenubar from './commonComponents/MainMenubar';
import PlainButton from './commonComponents/PlainButton';

const INITIAL_VIDEO_SHOW_COUNT = 10;

const FIELD_IDS = Object.freeze({
  titleSearchId: 'title-search',
  preacherSearchId: 'preacher-search',
  dateSearchId: 'date-search',
  scriptureSearchId: 'scripture-search',
});

const initialSearchInfo = {
  [FIELD_IDS.titleSearchId]: '',
  [FIELD_IDS.preacherSearchId]: '',
  [FIELD_IDS.dateSearchId]: '',
  [FIELD_IDS.scriptureSearchId]: '',
};

const StyledWatchPage = styled.div`
  background-color: var(--gossamer-veil);
  color: var(--text-on-light-background);
  min-height: 100%;

  .content {
    font-size: 14px;
    font-weight: bold;
    padding: 0 var(--gutter-space) var(--page-bottom-padding)
      var(--gutter-space);
  }

  h2 {
    color: var(--watch-page-text-accent);
  }

  .preacher-and-scripture {
    .value {
      color: var(--watch-page-text-accent);
    }

    div {
      display: inline-block;
    }

    div:not(:first-child) {
      margin-left: 1em;
    }
  }

  .date {
    font-weight: bold;
    line-height: 200%;
  }

  .main-video-div {
    margin-bottom: 32px;
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .archive-videos {
    .archive-video-container {
      font-size: 12px;
      line-height: 180%;
      margin-bottom: 1em;
      display: flex;

      iframe {
        display: inline-block;
      }

      .label-value {
        display: inline-block;

        .value {
          color: var(--watch-page-text-accent);
        }

        & + .label-value {
          margin-left: 20px;
        }
      }

      .video-info {
        margin-left: 32px;

        p {
          width: 600px;
        }
      }

      h3 {
        font-size: 16px;
        font-weight: bold;
        margin-top: 0;
        margin-bottom: 0.5em;
        color: var(--watch-page-text-accent);
      }
    }
  }

  .show-more {
    display: flex;
    justify-content: center;

    button {
      color: black;
      display: block;
      text-align: center;
    }

    i {
      color: var(--watch-page-text-accent);
    }
  }
`;

function renderLabelValue(label, value) {
  return (
    <div className="label-value">
      <span className="label">{label}:</span>{' '}
      <span className="value">{value}</span>
    </div>
  );
}

function renderScriptureLabelValue(label, scripture, version) {
  let scriptureText = scripture;
  if (version) {
    scriptureText += ` (${
      constants.BIBLE_VERSIONS_INFO[version]?.short ?? version
    })`;
  }

  return renderLabelValue(label, scriptureText);
}

function videoFrame(youtubeId, title) {
  return (
    <iframe
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      frameBorder="0"
      src={`https://www.youtube.com/embed/${youtubeId}`}
      title={title}
    />
  );
}

function renderArchiveVideos(otherVideos) {
  return (
    <div className="archive-videos">
      {otherVideos.map((videoData) => {
        const {
          date,
          description,
          preacher,
          preacherLabel = 'Preacher',
          scripture,
          version,
          title,
          youtubeId,
        } = videoData;

        return (
          <div className="archive-video-container" key={title}>
            {videoFrame(youtubeId, title)}
            <div className="video-info">
              <h3>{title}</h3>
              {renderLabelValue(preacherLabel, preacher)}
              {scripture &&
                renderScriptureLabelValue('Scripture', scripture, version)}
              <br />
              {getLongDisplayDate(date)}
              <br />
              <p>{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function renderNewestVideo(videoData) {
  const {
    date,
    preacher,
    preacherLabel = 'Preacher',
    scripture,
    title,
    youtubeId,
    videoMissingMessage,
    version,
  } = videoData;

  return (
    <div>
      <h2>{title}</h2>
      <div className="preacher-and-scripture">
        {preacher && <div>{renderLabelValue(preacherLabel, preacher)}</div>}
        {scripture && (
          <div>
            {renderScriptureLabelValue('Scripture', scripture, version)}
          </div>
        )}
      </div>
      <div className="date">{getLongDisplayDate(date)}</div>
      {youtubeId ? (
        <div className="main-video-div">{videoFrame(youtubeId, title)}</div>
      ) : (
        videoMissingMessage
      )}
    </div>
  );
}

function renderShowMore(setArchiveVideoShowCount, archiveVideoShowCount) {
  return (
    <div className="show-more">
      <PlainButton
        onClick={() => setArchiveVideoShowCount(archiveVideoShowCount + 10)}
      >
        <i className="fa fa-angle-double-down" /> Show More Videos{' '}
        <i className="fa fa-angle-double-down" />
      </PlainButton>
    </div>
  );
}

function filterVideos(otherVideos, searchInfo) {
  const caseInsensitiveIncludes = function (string, searchString) {
    return (
      !string || string?.toLowerCase()?.includes(searchString?.toLowerCase())
    );
  };

  return otherVideos.filter((videoInfo) => {
    return (
      caseInsensitiveIncludes(
        videoInfo.preacher,
        searchInfo[FIELD_IDS.preacherSearchId],
      ) &&
      caseInsensitiveIncludes(
        videoInfo.title,
        searchInfo[FIELD_IDS.titleSearchId],
      ) &&
      caseInsensitiveIncludes(
        videoInfo.date,
        convertTypedDateToIso(searchInfo[FIELD_IDS.dateSearchId]),
      ) &&
      caseInsensitiveIncludes(
        videoInfo.scripture,
        searchInfo[FIELD_IDS.scriptureSearchId],
      )
    );
  });
}

const WatchPage = () => {
  const [archiveVideoShowCount, setArchiveVideoShowCount] = useState(
    INITIAL_VIDEO_SHOW_COUNT,
  );
  const [searchInfo, setSearchInfo] = useState(initialSearchInfo);
  const [newestVideo, ...notNewestVideos] = sermonVideos;
  // videos without youtube id are just placeholders for days where video doesn't exist
  const otherVideos = notNewestVideos.filter(({youtubeId}) => youtubeId);

  const [filteredVideos, setFilteredVideos] = useState(otherVideos);

  const displayedVideos = filteredVideos.slice(0, archiveVideoShowCount);
  const renderShowMoreContent = filteredVideos.length >= archiveVideoShowCount;

  return (
    <StyledWatchPage>
      <MainMenubar imageSource={choir} />
      <div className="content">
        {renderNewestVideo(newestVideo)}
        <WatchPageFilter
          ids={FIELD_IDS}
          onFilterClick={() =>
            setFilteredVideos(filterVideos(otherVideos, searchInfo))
          }
          onResetClick={() => {
            setSearchInfo(initialSearchInfo);
            setFilteredVideos(filterVideos(otherVideos, initialSearchInfo));
          }}
          searchInfo={searchInfo}
          setSearchInfo={setSearchInfo}
        />
        {renderArchiveVideos(displayedVideos)}
        {renderShowMoreContent &&
          renderShowMore(setArchiveVideoShowCount, archiveVideoShowCount)}
      </div>
    </StyledWatchPage>
  );
};

export default WatchPage;
