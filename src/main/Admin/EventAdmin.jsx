import {Parser as HtmlToReactParser} from 'html-to-react';
import moment from 'moment';
import React, {Component} from 'react';

import firebase from '../../firebase';
import commonUtils from '../../utils/commonUtils';
import Button from '../commonComponents/Button/Button';
import Checklist from '../commonComponents/Checklist/Checklist';
import Textbox from '../commonComponents/Textbox';

const TIME_FORMAT = {
  SIMPLE_TIME: 'h:mm a',
  DATE_TIME: 'YYYY-MM-DDTHH:mm:ss',
  STD_DATE: 'YYYY-MM-DD',
};

class EventAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAnnouncement: false,
      followsWorship: false,
      name: '',
      date: '',
      dates: {},
      longDescription: '',
      removeKey: '',
      timeEnd: '',
      timeStart: '',
      title: '',
      user: null,
    };

    this.onChange = this.onChange.bind(this);
    this.getDateTimeFromSimple = this.getDateTimeFromSimple.bind(this);
    this.submit = this.submit.bind(this);
    this.editItem = this.editItem.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    // FBH get a reference for the 'dates' top level prop of the data
    const datesRef = firebase.database().ref('dates');

    // FBH add a listener to the dates object, update on value change (guessing)
    // listener gets the dates object using snapshot.val();
    // then pushes the udpated date object into the state
    datesRef.on('value', (snapshot) => {
      const dates = snapshot.val();

      this.setState({
        dates,
      });
    });
  }

  onChange(value, id) {
    this.setState({[id]: value});
  }

  getDateTimeFromSimple(date, time) {
    if (time) {
      const timeMoment = time
        ? moment(time, TIME_FORMAT.SIMPLE_TIME, true)
        : null;

      if (timeMoment.isValid()) {
        const dateTimeMoment = moment(date, TIME_FORMAT.STD_DATE).set({
          hour: timeMoment.hour(),
          minute: timeMoment.minute(),
        });

        return dateTimeMoment.format(TIME_FORMAT.DATE_TIME);
      }
    }

    return time ? false : null;
  }

  getSimpleTimeFromDateTime(dateTimeString) {
    if (dateTimeString) {
      return moment(dateTimeString)
        .format(TIME_FORMAT.SIMPLE_TIME)
        .replace(/\./g, '');
    }

    return '';
  }

  isValid(event) {
    const {title, timeStart, timeEnd} = event;

    return title && timeStart !== false && timeEnd !== false;
  }

  submit(isNew, key) {
    // FBH get 'dates' reference from firebase
    const {
      originalDate,
      date,
      timeEnd,
      timeStart,
      title,
      longDescription,
      followsWorship,
      isAnnouncement,
    } = this.state;

    const hasValidDate = moment(date, TIME_FORMAT.STD_DATE, true).isValid();

    // make new date object
    const event = {
      title: title,
      timeStart: this.getDateTimeFromSimple(date, timeStart),
      timeEnd: this.getDateTimeFromSimple(date, timeEnd),
      longDescription: longDescription || null,
      followsWorship: followsWorship || null,
      isAnnouncement: isAnnouncement || null,
    };

    const dataIsValid = this.isValid(event) && hasValidDate;

    if (dataIsValid) {
      if (isNew) {
        const dateRef = firebase.database().ref(`dates/${date}/events`);

        // push date object into 'dates' reference

        dateRef.push(event);
        this.resetData();
        this.setState({currentEdit: null});
      } else {
        const sameDate = date === originalDate;

        const eventRef = this.getEventRef(originalDate, key);
        if (sameDate) {
          eventRef.set(event);
        } else {
          eventRef.set(null);

          const dateRef = firebase.database().ref(`dates/${date}/events`);
          dateRef.push(event);
        }
      }
    }
  }

  resetData() {
    this.setState({
      date: '',
      title: '',
      timeStart: '',
      timeEnd: '',
      longDescription: '',
      followsWorship: false,
      isAnnouncement: false,
    });
  }

  // FBH get specific date reference from firebase using key
  getEventRef(dateString, key) {
    return firebase.database().ref(`/dates/${dateString}/events/${key}`);
  }

  editItem(dateTitleKey, date, eventObject) {
    const {
      isAnnouncement,
      followsWorship,
      title,
      timeStart,
      timeEnd,
      shortDescription,
      longDescription,
    } = eventObject;

    this.setState({
      currentEdit: dateTitleKey,
      originalDate: date,
      date,
      title,
      timeStart: this.getSimpleTimeFromDateTime(timeStart),
      timeEnd: this.getSimpleTimeFromDateTime(timeEnd),
      shortDescription,
      longDescription,
      isAnnouncement,
      followsWorship,
    });
  }

  cancelEdit() {
    this.setState({currentEdit: null});
    this.resetData();
  }

  removeItem(dateString, key) {
    // FBH get specific date reference from firebase using key
    const eventRef = this.getEventRef(dateString, key);

    eventRef.once('value', (snapshot) => {
      const value = snapshot.val();
      const title = typeof value === 'string' ? value : value.title;
      const confirmMessage = `Are you sure you want to delete the event titled ${title}?`;

      if (window.confirm(confirmMessage)) {
        eventRef.remove();
      }
    });
  }

  renderItems() {
    const rows = [];

    const getTime = (dateTime) => (dateTime ? dateTime.substring(11) : '');
    const listOptions = (event) => {
      const options = ['isAnnouncement', 'followsWorship'];
      const enabledOptions = options.filter((option) => {
        return event[option];
      });

      return enabledOptions.join(', ');
    };

    commonUtils.lodashForEach(this.state.dates, (date, dateString) => {
      commonUtils.lodashForEach(date.events, (event, key) => {
        if (event) {
          const eventObject =
            typeof event === 'string' ? {title: event} : event;
          const {title, timeStart, timeEnd, shortDescription, longDescription} =
            eventObject;

          const dateTitleKey = dateString + title + timeStart;
          const currentlyEditing = dateTitleKey === this.state.currentEdit;
          const htmlToReactParser = new HtmlToReactParser();
          const longDescriptionRender =
            htmlToReactParser.parse(longDescription);

          rows.push(
            <div className="event-item" key={dateTitleKey}>
              <strong>{title}</strong>
              <ul>
                <li>Date: {dateString}</li>
                <li>Start: {getTime(timeStart)}</li>
                <li>End: {getTime(timeEnd)}</li>
                <li>Short Description: {shortDescription}</li>
                <li>Long Description: {longDescription}</li>
                <li>Options: {listOptions(event)}</li>
              </ul>
              {longDescription ? (
                <div>
                  <p>Long description appearance</p>
                  {longDescriptionRender}
                </div>
              ) : null}
              {currentlyEditing ? (
                <div>{this.renderEditInput(false, key)} </div>
              ) : (
                <div>
                  <Button
                    onClick={() =>
                      this.editItem(dateTitleKey, dateString, eventObject)
                    }
                  >
                    Edit
                  </Button>{' '}
                  <Button onClick={() => this.removeItem(dateString, key)}>
                    Remove
                  </Button>
                </div>
              )}
            </div>,
          );
        }
      });
    });

    return <div>{rows}</div>;
  }

  getOptionsList({isAnnouncement, followsWorship}) {
    return [
      {
        checked: Boolean(isAnnouncement),
        label: 'Announcement',
        value: 'isAnnouncement',
      },
      {
        checked: Boolean(followsWorship),
        label: 'Immediately Follows Worship',
        value: 'followsWorship',
      },
    ];
  }

  renderEditInput(isNew, key) {
    return (
      <div>
        <Textbox
          id="date"
          label="Date"
          onChange={this.onChange}
          placeholder="YYYY-MM-DD"
          value={this.state.date}
        />
        <Textbox
          id="title"
          label="Title"
          onChange={this.onChange}
          value={this.state.title}
        />
        <Textbox
          id="timeStart"
          label="Start Time"
          onChange={this.onChange}
          placeholder="HH:MM am"
          value={this.state.timeStart}
        />
        <Textbox
          id="timeEnd"
          label="End Time"
          onChange={this.onChange}
          placeholder="HH:MM am"
          value={this.state.timeEnd}
        />
        <div>
          <Textbox
            columns={80}
            id="longDescription"
            label="Long Description"
            onChange={this.onChange}
            textArea
            value={this.state.longDescription || ''}
          />
        </div>
        <Checklist
          checklistItems={this.getOptionsList(this.state)}
          id="options-checklist"
          label="Options"
          onChange={this.onChange}
        />
        <div>
          <Button onClick={(event) => this.submit(isNew, key, event)}>
            Submit
          </Button>
          <Button onClick={this.cancelEdit}>Cancel</Button>
        </div>
      </div>
    );
  }

  render() {
    const addingEvent = this.state.currentEdit === 'new';
    const onAddItemClick = () => {
      this.setState({currentEdit: 'new'});
    };

    return (
      <div>
        <div>
          <Button onClick={onAddItemClick}>Add Item</Button>
        </div>
        {addingEvent && this.renderEditInput(true)}
        <div>{this.renderItems()}</div>
      </div>
    );
  }
}

export default EventAdmin;
