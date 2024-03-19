import constants from '../utils/constants';
import {getNumberOfDaysAgo, isPast, parseISO} from '../utils/dateTimeUtils';

const {PREACHERS, BIBLE_VERSIONS} = constants;

const sermonVideos = [
  {
    date: '2024-03-17',
    youtubeId: 'cZ45Hhj1Sz8',
    title: '"Living Above it!',
    preacher: PREACHERS.T_CURLEY,
    scripture: 'Mark 10:17-22',
    version: BIBLE_VERSIONS.NRSVUE,
  },
  {
    date: '2024-03-10',
    youtubeId: 'kKJQ0VnF3T8',
    title: 'The Light is Within You',
    preacher: PREACHERS.T_CURLEY,
    scripture: 'John 3:16-21',
    version: BIBLE_VERSIONS.KJV,
  },
  {
    date: '2024-03-03',
    youtubeId: 'qjZnCKnuUxU',
    title: 'Want to Be Made Whole?!!!',
    preacher: PREACHERS.D_NELSON,
    scripture: '2 Chronicles 7:14',
    version: BIBLE_VERSIONS.NIV,
  },
  {
    date: '2024-02-25',
    youtubeId: 'H1UTDFsDmJg',
    title: 'Embracing God’s Vision, Voice and Victory',
    preacher: PREACHERS.D_HICKMAN,
  },
  {
    date: '2024-02-18',
    youtubeId: 'LfdEvcKFK1Y',
    title: 'Its Time For A Revival!!!',
    preacher: PREACHERS.T_CURLEY,
    scripture: '2 Chronicles 7:14',
    version: BIBLE_VERSIONS.NIV,
  },
  {
    date: '2024-02-11',
    youtubeId: 'YFi5vBYxu6g',
    title: 'Steeped In God!',
    preacher: PREACHERS.M_HAMIEL,
    scripture: 'Matthew 6:33',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2024-02-04',
    youtubeId: 'vWsoNopo0nE',
    title: 'God of Justice and Our Black History',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Micah 6:1-8 Amos 5:24',
  },
  {
    date: '2024-01-28',
    youtubeId: 'PjBgHdESMqk',
    title: 'The Unpopular Choice!!!',
    preacher: PREACHERS.D_NELSON,
    scripture: 'Luke 10:38-42',
    version: BIBLE_VERSIONS.KJV,
  },
  {
    date: '2024-01-21',
    videoMissingMessage: 'No video this date due to weather',
  },
  {
    date: '2024-01-14',
    youtubeId: '663oOFNF10A',
    title: 'Walking in Truth!!!',
    preacher: PREACHERS.T_CURLEY,
    scripture: '3 John 1:1-4 3:1-9 and Psalm 62:5',
    version: BIBLE_VERSIONS.NIV,
  },
  {
    date: '2024-01-07',
    youtubeId: 'XFKf2HYDWGs',
    title: 'A New Year of New Things & A New Direction',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Joshua 3:1-9 and Isaiah 43:18-19',
    version: BIBLE_VERSIONS.NIV,
  },
  {
    date: '2023-12-31',
    youtubeId: '0v_zh_Qj12I',
    title: 'The Unthinkable is on the Way',
    preacher: PREACHERS.M_HAMIEL,
  },
  {
    date: '2023-12-24',
    youtubeId: 'B6YeXDbtTD4',
    title: 'Heaven Comes To Earth',
    preacher: PREACHERS.D_HICKMAN,
  },
  {
    date: '2023-12-17',
    youtubeId: 'Pew-6DgC-kU',
    title: 'Will You Serve Your Purpose?!!!',
    preacher: PREACHERS.D_NELSON,
    scripture: 'Luke 2:10-11 & Matthew 26:36-46',
    version: BIBLE_VERSIONS.KJV,
  },
  {
    date: '2023-12-10',
    youtubeId: 'GkD-xD2SU3A',
    title: 'Words of Comfort, The Lord Has Spoken',
    preacher: PREACHERS.T_CURLEY,
    scripture: 'Isaiah 40:1-5',
    version: BIBLE_VERSIONS.NIV,
  },
  {
    date: '2023-12-03',
    youtubeId: '2zjNrgEkX74',
    title: 'Waiting In Hope!!!!',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Psalm130:5 and Isaiah 40:31',
  },
  {
    date: '2023-11-26',
    youtubeId: 'ieHk_FG4Axg',
    title: 'Two is Greater Than One!',
    preacher: 'Rev. Dr. Carl Hamiel',
    scripture: 'Mark 6:6-7',
  },
  {
    date: '2023-11-19',
    youtubeId: 'm4k-gwKVAMA',
    title: 'Help for the Chosen',
    preacher: PREACHERS.L_FORD,
    scripture: 'Isaiah 41:8-13',
    version: BIBLE_VERSIONS.NRSV,
  },
  {
    date: '2023-11-12',
    youtubeId: 'UPmk83aBIds',
    title: 'Stay Connected!',
    preacher: 'Rev. Carmi Washington Flood',
    scripture: 'John 15:1-5',
  },
  {
    date: '2023-11-05',
    youtubeId: '2qV9E9zlyA0',
    title: 'Encouragement in the Storm',
    preacher: PREACHERS.D_NELSON,
    scripture: 'Matthew 8:23-27',
  },
  {
    date: '2023-10-29',
    youtubeId: '9n4O1mnENdE',
    title: 'Faith, Fasting, and Prayers Move Mountains',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Matthew 17:20-21',
  },
  {
    date: '2023-10-22',
    youtubeId: 'wVjGCEoUxw0',
    title: 'Our Duty is to Center Love!!!',
    preacher: PREACHERS.M_HAMIEL,
    scripture: 'Matthew 22:36-40',
  },
  {
    date: '2023-10-15',
    youtubeId: 't4qxWrUeOyI',
    title: 'A Heart Of Thankfulness',
    preacher: PREACHERS.T_CURLEY,
    scripture: 'Psalm 50:23',
  },
  {
    date: '2023-10-08',
    youtubeId: 'p_n7LtB9CAk',
    title: 'Don’t Take the Bait!',
    preacher: PREACHERS.D_NELSON,
    scripture: 'Matthew 27:38-4',
  },
  {
    date: '2023-10-01',
    youtubeId: '1HkP65VXiHQ',
    title: 'Praise & Worship Activate Deliverance',
    preacher: PREACHERS.D_HICKMAN,
    scripture: ' Psalm 50:23',
  },
  {
    date: '2023-09-24T09:00:00',
    youtubeId: 'lfzo45F0Eqo',
    title: 'The Joy of Tribulation',
    preacher: PREACHERS.D_NELSON,
    scripture: 'Hebrews 12:1-2',
    version: BIBLE_VERSIONS.KJV,
  },
  {
    date: '2023-09-17T09:00:00',
    youtubeId: 't508wTOe4fk',
    title: 'When Love Calls, You Better Answer',
    preacher: PREACHERS.M_HAMIEL,
  },
  {
    date: '2023-09-10T09:00:00',
    youtubeId: 'T8KfYwSlekY',
    title: 'Reposition for Your Revival',
    preacher: PREACHERS.L_FORD,
    scripture: 'Luke 19:1-10',
    version: BIBLE_VERSIONS.NRSV,
  },
  {
    date: '2023-09-03T09:00:00',
    youtubeId: 'L9XUIMRJLVg',
    title: 'Our Power Is Through His Blood',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Ephesians 1:7',
  },
  {
    date: '2023-08-28T09:00:00',
    youtubeId: 'veG9E4_uhqU',
    title: 'It’s Too Much to Bear and Trust the Process',
    preacher: PREACHERS.M_HAMIEL,
    scripture: '1 Corinthians 10:13',
  },
  {
    date: '2023-08-20T09:00:00',
    youtubeId: 'kikY5l58oR8',
    title: 'A Powerful Shield of Protection',
    preacher: PREACHERS.T_CURLEY,
    scripture: 'Psalm 91:1-4',
  },
  {
    date: '2023-08-13T09:00:00',
    youtubeId: 'hXtHEUlWJxg',
    title: 'The Blessing of Tribulation',
    preacher: PREACHERS.D_NELSON,
    scripture: 'John 16:30-33',
  },
  {
    date: '2023-08-06T09:00:00',
    youtubeId: 'c_vkOBFTYnI',
    title: 'An Affirmation of Living Hope',
    preacher: PREACHERS.G_YEARGIN,
    scripture: '1 Peter 1:3-5',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-07-30T09:00:00',
    youtubeId: '9bftHTZ7BVo',
    title: 'The Lord is Our Keeper',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Psalm 121:1-8',
    version: BIBLE_VERSIONS.ESV,
  },
  {
    date: '2023-07-23T09:00:00',
    youtubeId: 'CyDBEUG3zeU',
    title: 'Dealing with Our Anxious Fears',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Psalm 27:1; 13-14',
    version: BIBLE_VERSIONS.KJV,
  },
  {
    date: '2023-07-16T09:00:00',
    youtubeId: 'fFw0gYa_Um4',
    title: 'Why Prayer Is Essential',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 6:7-8; Luke 11:1-2',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-07-09T09:00:00',
    youtubeId: 'lrytWg48Wwk',
    title: 'A Parting Epitaph To The Kingdom!!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'St. Luke 39; 39-52',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-07-02T09:00:00',
    youtubeId: 'WINEsHUtuWk',
    title: 'Meeting God in Unexpected Places!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Genesis 28:10-22',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-06-25T09:00:00',
    youtubeId: 'QdsFMaOcx1Q',
    title: 'Molded with Inherited Power!',
    preacher: PREACHERS.L_FORD,
    scripture: '2 Corinthians 4:7-12',
  },
  {
    date: '2023-06-18T09:00:00',
    youtubeId: 'CwmqgBDwTDQ',
    title: 'A Father’s Compassion',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Psalm 103:13-14',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-06-11T09:00:00',
    youtubeId: '-eqqGEMHsj0',
    title: 'Use It or Lose It',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 25: 14-30',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-06-04T09:00:00',
    youtubeId: '4sFFwNBrq1E',
    title: 'An Invitation to Perpetual Praise!!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Psalm 34:1-8',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-05-28T09:00:00',
    youtubeId: '5H2wJpwWszc',
    title: 'A Word About Pentecost',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Acts 2:1-4',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-05-21T09:00:00',
    youtubeId: '50k3f1FvHpA',
    title: 'An Appeal To Be Who We Are',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Romans 12:1-2',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-05-14T09:00:00',
    youtubeId: '4BjZ8CNNWsw',
    title: 'The Influence of Godly Mothers',
    preacher: PREACHERS.D_HICKMAN,
    scripture: '2 Timothy 1: 1-5 and 3: 14-17',
  },
  {
    date: '2023-05-07T09:00:00',
    youtubeId: 'JizHSNmItOU',
    title: 'A Perfect Portrait of Prayer',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 4:46-54',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-04-30T09:00:00',
    youtubeId: '2-nM8hq5yN8',
    title: 'Confident About Our Completion!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Philippians 1:3-6',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-04-23T09:00:00',
    youtubeId: 'fv7yEe2Ihtg',
    title: 'Divine Devotion Disrupted By Human Distress!!!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 6:16-21',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-04-16T09:00:00',
    youtubeId: 'mXN8zLGgMV4',
    title: 'Seeing God Through You',
    preacher: PREACHERS.M_HAMIEL,
    scripture: 'Ruth 1:8-9, 16-18',
  },
  {
    date: '2023-04-09T09:00:00',
    youtubeId: 'LcPpjljkKXM',
    title: 'The Resurrection',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 24:1-12',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-04-02T09:00:00',
    youtubeId: 'sQkT7tew9II',
    title: 'Jesus’ Parting Act of Healing',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 21:12-17',
  },
  {
    date: '2023-03-26T09:00:00',
    youtubeId: 'lKFnpkGe4wk',
    title: 'The Necessity of This Death',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 12:20-29',
  },
  {
    date: '2023-03-19T09:00:00',
    youtubeId: 'n1jT10nKzF4',
    title: 'A Peek Into The Heart of God',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 11: 33-35',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-03-12T09:00:00',
    youtubeId: 'RVXNkj91vSw',
    title: 'Going Up to Jerusalem',
    preacher: PREACHERS.G_YEARGIN,
  },
  {
    date: '2023-03-05T09:00:00',
    youtubeId: 'ssSRCFBVgCU',
    title: 'A Different Kind of Kingdom',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 18:28-37',
  },
  {
    date: '2023-02-26T09:00:00',
    youtubeId: 'xOtZf6HJ2DY',
    title: 'The Favor of God',
    preacher: 'Pastor Donald Wright, Jr',
    scripture: 'Psalm 94',
  },
  {
    date: '2023-02-19T09:00:00',
    youtubeId: 'aQfN1WLesng',
    title: 'A Word About Oneness!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Ephesians 4:1-6',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-02-12T09:00:00',
    youtubeId: '826_6jrj730',
    title: 'If We Don’t Tell Them, How Will They Know!!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Deuteronomy 6:1-9',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-02-05T09:00:00',
    youtubeId: '8jpUXI4sP4E',
    title:
      'Lessons From Our Foreparents: When Our Backs Are Against The Wall!!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 14:1-6',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-01-29T09:00:00',
    youtubeId: '-REZwyMx8Uc',
    title: 'Walking On Water..Really!!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 14:22-32',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-01-22T09:00:00',
    youtubeId: 'RanqbjPkdlI',
    title: 'When the Human Condition Meets Unconditional Love',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Mark 1:40-45',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-01-15T09:00:00',
    youtubeId: 'hiRAdthcNmg',
    title: 'Handicapped Heroes!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Judges 3:15',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2023-01-08T09:00:00',
    youtubeId: 'pM97KmTg5mI',
    title: 'Dealing With Desperation',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Mark 5:21-24; 35-43',
  },
  {
    date: '2023-01-01T09:00:00',
    youtubeId: '2IVBH5CYzx4',
    title: 'The Fundamental Truth About God!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Psalm 116',
  },
  {
    date: '2022-12-25T09:00:00',
    youtubeId: '_Aprx2PkB4c',
    title: 'And The Word Became Flesh!!!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 1:14',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2022-12-18T09:00:00',
    youtubeId: 'Ia4uA_wwtiA',
    title: 'Sacrificial Love',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'John 3:16 & Ephesians 5:1-2',
  },
  {
    date: '2022-12-11T09:00:00',
    youtubeId: 'ksKqO07MIOs',
    title: 'Preparing the Way for The Glory of the Lord',
    preacher: PREACHERS.G_YEARGIN,
    scripture: null,
  },
  {
    date: '2022-12-04T09:00:00',
    youtubeId: 'BmiBgvB5Snk',
    title: 'Divine Illumination!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 1:1-9 NLT',
  },
  {
    date: '2022-11-27T09:00:00',
    youtubeId: 'WDljIsS-mb0',
    title: 'What We Need to Know When Believing Is Not Enough!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 16:16-33 NLT',
  },
  {
    date: '2022-11-20T09:00:00',
    youtubeId: 'EM4wCQHVwLQ',
    title: 'It’s All Over You! - Pastoral Apprecation Service',
    preacher: 'Rev. Carl Hamiel',
    scripture: '1 Timothy 4:13-15',
  },
  {
    date: '2022-11-13T09:00:00',
    youtubeId: 'Irp2fNK3RS4',
    title: 'Everything Lives Wherever The River Flows!!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Ezekiel 47:1-12',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2022-11-06T09:00:00',
    youtubeId: 'oHvV9FWB44c',
    title: 'Reaffirming The Church!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 16:13-20',
  },
  {
    date: '2022-10-30T09:00:00',
    youtubeId: 'kiNYsYDQwsE',
    title: 'Worship Service October 30th, 2022',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 6:13',
  },
  {
    date: '2022-10-23T09:00:00',
    youtubeId: 'fLLM1YA4xBQ',
    title: 'Alleviating Our Anxious Fears',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Psalm 27:1, 13-14',
  },
  {
    date: '2022-10-16T09:00:00',
    youtubeId: 'GwIIGE8-lMM',
    title: 'A Parting Epitaph To The Kingdom of God',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 22:47-52',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2022-09-11T09:00:00',
    youtubeId: '7I8trozVG1A',
    title: 'Knowing the God who Knows Us',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Psalm 139',
  },
  {
    date: '2022-09-04T09:00:00',
    youtubeId: 'j0L5ISIvE_g',
    title: 'Is Anything Too Hard For God?',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Genesis 18:14',
  },
  {
    date: '2022-07-17T09:00:00',
    youtubeId: 'de8bdXToNMg',
    title: 'An Absolute Assurance!!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Philippians 4:18-20 NLT',
  },
  {
    date: '2022-07-10T09:00:00',
    youtubeId: 'oY9hUzY7lc0',
    title: 'The Unconditional Love of the Father',
    preacher: PREACHERS.D_NELSON,
    scripture: 'Luke 15:11-32',
  },
  {
    date: '2022-06-26T09:00:00',
    youtubeId: 'pWkJ7HtVcqM',
    title: 'Soar On Eagle’s Wings',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Isaiah 40:31',
  },
  {
    date: '2022-06-19T09:00:00',
    youtubeId: 'CnnUEJpSAc0',
    title: 'When Dad’s Don’t Disappear',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 1:24-25; 3:16-17',
    version: BIBLE_VERSIONS.NLT,
  },
  {
    date: '2022-06-12T09:00:00',
    youtubeId: 'IxW7by_c4Tc',
    title: 'Father Endow Us Again',
    preacher: PREACHERS.D_HICKMAN,
    scripture: '1 Timothy 4:14',
    version: BIBLE_VERSIONS.KJV,
  },
  {
    date: '2022-06-05T09:00:00',
    youtubeId: '1s95G6D6Nbk',
    title: 'A Word About Pentecost',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Acts 2:1-4',
  },
  {
    date: '2022-05-29T09:00:00',
    youtubeId: 'bWn-yV8lG3A',
    title: 'Gideon’s Flaw and God’s Faithfulness!!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Judges 6:33-40',
  },
  {
    date: '2022-05-22T09:00:00',
    youtubeId: 'zT0RVg6EZYc',
    title: 'The Truth About Belief and Faith',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 17:14-21',
  },
  {
    date: '2022-05-15T09:00:00',
    youtubeId: 'VLQRPGcc-C8',
    title: 'The Plea for Conscious Weakness!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 6:13',
  },
  {
    date: '2022-05-08T09:00:00',
    youtubeId: '6UYQQ8QjDp8',
    title: 'A Mother of Great Faith',
    preacher: PREACHERS.P_YEARGIN,
    scripture: 'Exodus 2:1-10',
  },
  {
    date: '2022-05-01T09:00:00',
    youtubeId: 'xEkPwmmo4Ec',
    title: 'Voluntary Vulnerability',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Philippians 2:5-8',
  },
  {
    date: '2022-04-26T09:00:00',
    youtubeId: '1TK_vszH5d8',
    title: 'Stop Doubting & Only Believe!',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'John 20:24-29',
  },
  {
    date: '2022-04-17T09:00:00',
    youtubeId: 'QqTZOcTvDK0',
    title: 'Resurrection: God’s Ultimate Affirmation of Life!!!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'II Corinthians 1:19-20',
  },
  {
    date: '2022-04-15T09:00:00',
    youtubeId: 'uBXYJHODlzw',
    title: 'Good Friday Service: Seven Last Words from The Cross',
    preacher: PREACHERS.MINISTERS,
  },
  {
    date: '2022-04-10T09:00:00',
    youtubeId: '_lcDMFY_sFM',
    title: 'A Kingdom Not of This World',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 18:36',
  },
  {
    date: '2022-04-03T09:00:00',
    youtubeId: 'e1TKkMWSzek',
    title: 'Let Us Also Go With Him',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 11:1-16',
  },
  {
    date: '2022-03-27T09:00:00',
    youtubeId: 'OvScMiUPbzM',
    title: 'Unsticking the Life that is Stuck!!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 4:1-30',
  },
  {
    date: '2022-03-20T09:00:00',
    youtubeId: 'DWP5v6OyjRg',
    title: 'The Unconditional Love of God',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Hosea 14:4-7',
  },
  {
    date: '2022-03-13T09:00:00',
    youtubeId: '4vGGW_mDeFA',
    title: 'Satan’s Temporary Leave of Absence',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Mark 10:32-34',
  },
  {
    date: '2022-02-27T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Judges 3:15',
    title: 'Handicapped Heroes',
    youtubeId: '0DTca4kBiBU',
  },
  {
    date: '2022-02-20T09:00:00',
    preacher: PREACHERS.D_NELSON,
    title: 'Who Am I',
    youtubeId: 'e5mJQstvm4g',
  },
  {
    date: '2022-02-06T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 14:12-14',
    title: 'A Calling to Greater Things',
    youtubeId: 'L9KeMe-HmbI',
  },
  {
    date: '2022-01-30T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Isaiah 9:2',
    title: 'When the Darkness Is Not Dark!',
    youtubeId: 'KRn-41pjS_U',
  },
  {
    date: '2022-01-23T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 12:20-28',
    title: 'Praying for God’s Glory!',
    youtubeId: 'J_t-9y4m6io',
  },
  {
    date: '2022-01-16T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Mark 9:28-29',
    title: 'Why Some of Our Prayers Fail!',
    youtubeId: 'hyDguKTxsUU',
  },
  {
    date: '2022-01-13T09:00:00',
    preacher: 'Dr. Irving',
    preacherLabel: 'Guest Speaker',
    title: 'A Conversation about Covid with Dr. Irving',
    youtubeId: 'sdtucPfv3w4',
  },
  {
    date: '2022-01-09T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 5:6',
    title: 'From Dire Need to Delightful Fulfillment',
    youtubeId: 'BCRK-XiQUnY',
  },
  {
    date: '2022-01-02T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Philippians 4:10-13',
    title: 'The Key to Coping',
    youtubeId: 'hICJ5H-A8f8',
  },
  {
    date: '2021-12-19T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 3:16-17',
    title: 'Why Jesus Came!!',
    youtubeId: 'Ti2ulDYG6Ig',
  },
  {
    date: '2021-12-12T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 1:26-38',
    title: 'Mary’s Greatest Virtue: Reawakening the Sense of Awe!',
    youtubeId: '7uqAm2Xm2Z0',
  },
  {
    date: '2021-12-03T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 1:18-23',
    title: 'Immanuel!',
    youtubeId: 'N4BPKTWTNOY',
  },
  {
    date: '2021-11-21T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: '1 Peter 1:1-5',
    title: 'A Living Hope!!',
    youtubeId: 'dSmlFN53Yto',
  },
  {
    date: '2021-11-14T09:00:00',
    preacher: 'Rev. Dr. Douglas Summers',
    scripture: 'John 19:38-42',
    title: 'Secret Servant',
    youtubeId: 'edjKn9B34AE',
  },
  {
    date: '2021-11-07T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Ephesians 3:14-21',
    title: 'Glorifying God Through The Church!!!',
    youtubeId: 'MYArLACc10M',
  },
  {
    date: '2021-10-31T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 25:1-13',
    title: 'There Are Some Things In This Life That Cannot Be Shared!!',
    youtubeId: 'D1ZswJljxNk',
  },
  {
    date: '2021-10-24T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Ephesians 4:11-13',
    title: 'Why We Are Here!!!',
    youtubeId: 'fZHPEME3UAk',
  },
  {
    date: '2021-10-17T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 12:22-32',
    title: 'Fearlessness In The Face of Fear!!!',
    youtubeId: 'vD3Y6O4GxsU',
  },
  {
    date: '2021-10-10T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 7:7-11',
    title: 'A Word About The God to Whom We Pray!!',
    youtubeId: 'lSBrLEJC2TE',
  },
  {
    date: '2021-10-03T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Hebrews 10:23-25',
    title: 'A Mature Approach  to Attending Worship!!!',
    youtubeId: 'UUybG69sOEM',
  },
  {
    date: '2021-09-26T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Philippians 3:12-15',
    title: 'In Passionate Pursuit',
    youtubeId: 'eU601W57FDI',
  },
  {
    date: '2021-09-19T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Mark 8:34-35',
    title: 'Discipleship’s Prime Directive!',
    youtubeId: 'uylPa-8jg9M',
  },
  {
    date: '2021-09-12T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 11:1-4',
    title: 'Lord, Teach Us to Pray!!',
    youtubeId: '_Ed4qcA54wg',
  },
  {
    date: '2021-09-05T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Ezekiel 36:22-24',
    title: 'Why God Grants Us Grace!!',
    youtubeId: '84PwFpbkiZE',
  },
  {
    date: '2021-08-29T09:00:00',
    preacher: PREACHERS.M_HAMIEL,
    scripture: 'Matthew 28:16-20',
    title: 'Future Disciples are Watching You',
    youtubeId: 'kPuO5T7KQk4',
  },
  {
    date: '2021-08-22T09:00:00',
    preacher: PREACHERS.T_CURLEY,
    scripture: 'Isaiah 60:1-3; Ephesians 5:8',
    title: 'Turn the Light On',
    youtubeId: 'wvbCNmW_Rmo',
  },
  {
    date: '2021-08-15T09:00:00',
    preacher: PREACHERS.D_NELSON,
    scripture: 'Matthew 6:14-15',
    title: 'Forgive Like You Want to be Forgiven',
    youtubeId: 'RG3_GDqA608',
  },
  {
    date: '2021-08-08T09:00:00',
    preacher: PREACHERS.D_HICKMAN,
    scripture: '1 Chronicles 16:11',
    title: 'Seeking and Worshipping God!',
    youtubeId: 'aXBJA7oillA',
  },
  {
    date: '2021-08-01T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Psalm 121',
    title: 'Being Kept!!',
    youtubeId: 'ZeN8L9a11-Y',
  },
  {
    date: '2021-07-25T09:00:00',
    preacher: PREACHERS.T_CURLEY,
    scripture: 'James 4:4-10',
    title: 'Grace to the Willing Humble',
    youtubeId: 'qcdXenQhzak',
  },
  {
    date: '2021-07-18T09:00:00',
    preacher: PREACHERS.D_NELSON,
    scripture: 'Matthew 5:43-48',
    title: 'What Perfected Love Looks Like',
    youtubeId: 'scRkf0P0mbI',
  },
  {
    date: '2021-07-11T09:00:00',
    preacher: PREACHERS.M_HAMIEL,
    scripture: 'Psalm 45:10',
    title: 'Be still and know God more',
    youtubeId: '4a5ZMGIHV54',
  },
  {
    date: '2021-07-04T09:00:00',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Isaiah 9:1-4 and Matthew 14:13-23',
    title: 'Commune With The Light Within',
    youtubeId: 'Qe7H7G9CDXI',
  },
  {
    date: '2021-06-27T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Exodus 14:1-14',
    title: 'It’s A Set-Up!!',
    youtubeId: 'R-_brYkii9E',
  },
  {
    date: '2021-06-20T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 1:24-25; 3:16-17',
    title: 'When Dads Don’t Disappear!!',
    youtubeId: '--cnkLzW42k',
  },
  {
    date: '2021-06-13T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 5:6',
    title: 'The Joy of Desperate Desire!!',
    youtubeId: 'R5YUBBwDqc0',
  },
  {
    date: '2021-06-06T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: '1 Peter 2:9-10',
    title: 'A Word About The Church!!',
    youtubeId: 'voipvS-Nras',
  },
  {
    date: '2021-05-30T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 12:32',
    title: 'Fearlessness In the Face of Fear',
    youtubeId: 'ejR-vA8IQA8',
  },
  {
    date: '2021-05-23T09:00:00',
    preacher: PREACHERS.T_CURLEY,
    scripture: 'Mark 11:22-24',
    title: 'Uplifting Faith in Hard Times!',
    youtubeId: '36ZyZ9m7Bkg',
  },
  {
    date: '2021-05-16T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    title: 'The Most Important Thing We Need To Know!!!',
    youtubeId: 'RsWoscyxDio',
  },
  {
    date: '2021-05-09T09:00:00',
    preacher: PREACHERS.M_HAMIEL,
    title: 'The Assignment',
    youtubeId: 'QQZJg-ewas8',
  },
  {
    date: '2021-05-02T09:00:00',
    preacher: PREACHERS.D_HICKMAN,
    title: 'Remember God’s Faithfulness When He Seems Silent!',
    youtubeId: 'WK9qXOXs1jE',
  },
  {
    date: '2021-04-25T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    title: 'Saved By Doubt',
    youtubeId: 'vDXRInqZhi4',
  },
  {
    date: '2021-04-18T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    title: 'The Pentecost Prophecy!',
    youtubeId: 'y3th4fXDPes',
  },
  {
    date: '2021-04-11T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    title: 'A Word of Encouragement to the Church',
    youtubeId: 'mEwD48vhw2k',
  },
  {
    date: '2021-04-04T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    title: 'The Resurrection',
    youtubeId: 'jarFc9dbpMI',
  },
  {
    date: '2021-04-02T12:00:00',
    // IMPROVEMENTS: handle this better, video page should say "Preachers"
    // when this is used and search should work for it
    preacher: PREACHERS.MINISTERS,
    title: 'Seven Last Words - From the Cross',
    youtubeId: 'IIRepOmhf_g',
  },
  {
    date: '2021-03-28T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    title: 'The Anointing of Jesus',
    youtubeId: 'KyVzhcTXpgM',
  },
  {
    date: '2021-03-21T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    title: 'Possessed By A Passion!!',
    youtubeId: '0ng_HXJIT9Q',
  },
  {
    date: '2021-03-14T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    title: 'Forgive Us',
    youtubeId: 'KdnPEQMtXwg',
  },
  {
    date: '2021-03-07T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    title: 'The Rejection of Jesus',
    youtubeId: 'FRoJDZ2hUDw',
  },
  {
    date: '2021-02-28T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    title: 'Let Us Go and Die with Him!!',
    youtubeId: 'JPvPnAh6LmI',
  },
  {
    date: '2021-02-21T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 14:1-6',
    title: 'Lessons From Our Ancestors',
    youtubeId: 'i2spFTwJnB8',
  },
  {
    date: '2021-02-14T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Mark 12:28-34',
    title: 'The Greatest Commandment',
    youtubeId: 'aqbQI38mYXo',
  },
  {
    date: '2021-02-07T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Deuteronomy 6:10​-12',
    title: 'Be Careful Not To Forget',
    youtubeId: 'Hurc3xNZBT4',
  },
  {
    date: '2021-01-31T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'I John 3:1-3',
    title: 'Getting The Who Right!',
    youtubeId: 'QOQIOSqlNWE',
  },
  {
    date: '2021-01-24T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Ephesians 3:14​-19',
    title: 'The Perfect Prayer For Spiritual Perfection',
    youtubeId: 'u_a6RdGl0yA',
  },
  {
    date: '2021-01-17T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Amos 5:18​-24',
    title: 'Remembering Our Drum Major For Justice',
    youtubeId: 'yLsCm8gaTME',
  },
  {
    date: '2021-01-10T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Mark 9:14-27',
    title: 'Caught Between Belief And Unbelief',
    youtubeId: 'dHjOF_DXj9I',
  },
  {
    date: '2021-01-03T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Philippians 4:4-7',
    title: 'A Portrait For Handling The New Year!',
    youtubeId: '2BdjN0_Vl1A',
  },
  {
    date: '2020-12-27T09:00:00',
    preacher: PREACHERS.L_FORD,
    scripture: 'Isaiah 43:16-21',
    title: 'Fresh Water for The New Thing!',
    youtubeId: 'q9oBsM30OLs',
  },
  {
    date: '2020-12-25T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    title: 'A Christmas Meditation',
    youtubeId: '5UuBSeEK0Fk',
  },
  {
    date: '2020-12-20T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 2:8-15',
    title: 'Glory to God in the Highest',
    youtubeId: '5LMjYM3jTGc',
  },
  {
    date: '2020-12-13T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 1:26-38',
    title: 'The Favor Of The Lord',
    youtubeId: 'jVq3TsR8Vf4',
  },
  {
    date: '2020-12-06T09:00:00',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 10:10',
    title: 'Why We Need Christmas',
    youtubeId: 'TKYTWWRzPY4',
  },
  {
    date: '2020-11-29T09:00:00',
    description:
      'Today is the beginning of the Advent season for all Christians. It is the season when we are called to ' +
      'prepare the way for the coming of the glory of God. However, preparing for the coming of the glory of God ' +
      'requires us to let go of those things in our lives that impedes us from experiencing God’s glory. It ' +
      'is a matter of letting go and letting God.',
    preacher: PREACHERS.G_YEARGIN,
    title: 'Preparing The Way For The Glory of the Lord',
    youtubeId: 'l6L6QomNGzY',
  },
  {
    date: '2020-11-26T10:00:00',
    preacher: PREACHERS.G_YEARGIN,
    title: 'Thanksgiving Reflection',
    youtubeId: 'mfhFol-eJyM',
  },
  {
    date: '2020-11-22',
    description:
      'Romans 8:28 - Have you ever wondered what God does with our mistakes and mess ups with our faults and flaws; ' +
      'even with our troubles and trials? I used to think that God takes them away to give us a chance to be the ' +
      'best we can be. However, life has taught me that God does not take away our mistakes and flaws, our ' +
      'troubles and trials. Actually, God uses them to help us become better persons. It is called the Divine ' +
      'Grace of Recycling!!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Romans 8:28',
    title: 'The Divine Grace of Recycling',
    youtubeId: 'OxFZzjqWhbw',
  },
  {
    date: '2020-11-15',
    description:
      'Over the past four years,  I have always believed that God has had His hand in the direction of ' +
      'this nation. In spite of that belief, many of us lived with fear, anxiety and despair. However, on ' +
      'November 7, 2020 God revealed His hand for this nation when we heard the news that Joe Biden had become ' +
      'the president elect. Therefore, I extend an invitation to you to join with me in “Praising the Lord!”',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Psalm 100',
    title: 'An Invitation To Praise',
    youtubeId: 'Du1f-JmR8wE',
  },
  {
    date: '2020-11-08',
    description:
      'Isaiah 40: 27-31 - For the past four years, we have experienced being anxious and unsettled. We have been ' +
      'ill at ease and weary. However we have come to that moment when that reality can be changed. That change ' +
      'will happen by waiting on the Lord!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Isaiah 40: 27-31',
    title: 'Waiting On The Lord!!',
    youtubeId: 'SEjRichM4uo',
  },
  {
    date: '2020-11-01',
    description:
      'Anxiety, seems to have become a part of our daily lives. It has become even more so as we face ' +
      'this upcoming presidential election. According to the wisdom teachings, in the book of Proverbs, there is a ' +
      'remedy that brings an end to our anxious fears. The remedy is “A matter of trusting in the Lord!”',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Proverbs  3:5-6',
    title: 'It’s A Matter of Trust',
    youtubeId: 'dh8nvLZhrug',
  },
  {
    date: '2020-10-25',
    description:
      'Matthew 5:6. We live in a world that suggests that our living can be fulfilling if we buy into what ' +
      'the world has to offer. However, with the passing of time we discover that this is not the case. For ' +
      'there is within all of us a hunger and thirst that only God can provide.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 5:6',
    title: 'From Dire Need To Delightful Fulfillment!',
    youtubeId: 'sNBj4u-sVPk',
  },
  {
    date: '2020-10-18',
    description:
      'Luke:12:22-23; 29-32 - We are living in a time of great anxiety, worry and fear. There are those  ' +
      'who have discovered that anxiety, worry and fear will not resolve our concerns. The message of Jesus, to  ' +
      'all of us is “Seek the Kingdom of God above all else and He will give you everything you need.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 12:22-23; 29-32',
    title: 'God’s Greatest Delight',
    youtubeId: 'Vq00x6UyVJo',
  },
  {
    date: '2020-10-11',
    description:
      'Several weeks ago, I preached a sermon entitled, “Why Prayer Is Essential.” Prayer is essential because ' +
      'troubles that we cannot handle on our own are woven into the fabric of our life and living. ' +
      'Therefore, we need to ask Jesus, “Lord, teach us to pray.” Then we will discover that the power of prayer' +
      ' is grounded and founded in the make-up  and nature of our relationship with God!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 11:1-4',
    title: 'Lord Teach Us To Pray!',
    youtubeId: 'LVmzLU2d-OE',
  },
  {
    date: '2020-10-04',
    description:
      'John 16:29-33 - There is no denying that we are living in rather troubling times. Jesus acknowledged ' +
      'that reality when he said, “Here on earth you will have many trials and sorrows.” In essence, He is ' +
      'saying “It is what it is!” However, the Master does not end with that reality. He then makes an ' +
      'incredible affirmation by declaring, “But take heart, because I have overcome the world!”',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 16:29-33',
    title: 'An Incredible Affirmation',
    youtubeId: 'YCxLUylQCZo',
  },
  {
    date: '2020-10-03',
    preacher: PREACHERS.G_YEARGIN,
    title: 'A Prayer For Our Nation',
    youtubeId: 'z7kWNgr4z5c',
  },
  {
    date: '2020-09-27',
    description:
      'Genesis 28:10-22. There are occasions in our lives when we would rather avoid having an encounter with God. ' +
      'We have not lived as best we should; we have done things we thought we would never do; we are haunted by the ' +
      'hurt that we have caused others. However, these situations may well be the best time to meet God in ' +
      'unexpected places!!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Genesis 28:10-22',
    title: 'Meeting God In Unexpected Places!!',
    youtubeId: 'tvavUdqnyxw',
  },
  {
    date: '2020-09-20',
    description:
      'Matthew 6:7-8; Luke 11:1 During ordinary times prayer is essential. We are now living in extraordinary ' +
      'times which present some realities that we cannot handle alone. In times such as these, we have a God to ' +
      'whom we can turn to for He knows all of our needs. That makes prayer even more essential.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 6:7-8; Luke 11:1',
    title: 'Why Prayer Is Essential',
    youtubeId: 'nr53AhF0-qg',
  },
  {
    date: '2020-09-13',
    description:
      'John 12:20-28 In this life we experience defining moments: moments that reveal who we are and why we ' +
      'are here. Not even Jesus could avoid such a moment. As a result, because He could not, we are given the gift ' +
      'of eternal life.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 12:20-28',
    title: 'The Master’s Defining Moment',
    youtubeId: 'F5MDLBccokw',
  },
  {
    date: '2020-09-06',
    description:
      'Ephesians 6:10-13 In 59 days we will elect the President of the United States of America. This is ' +
      'the most crucial election in the history of this nation.It is crucial because it will decide the moral ' +
      'character of our nation. Therefore It is imperative that we seek God’s guidance and direction in our decision ' +
      'that we make.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Ephesians 6:10-13',
    title: 'Don’t Get It Twisted',
    youtubeId: '-_CiQ9Vz6UU',
  },
  {
    date: '2020-08-30',
    description: 'Job 1:6-8',
    preacher: PREACHERS.M_HAMIEL,
    scripture: 'Job 1:6-8',
    title: 'Will You Make Your Daddy Proud?',
    youtubeId: 'VIqIHw4w20o',
  },
  {
    date: '2020-08-23',
    description: 'Amos 5: 1-7',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Amos 5: 1-7',
    title: 'Injustice and Bitterness Rots The Soul',
    youtubeId: 'qCaD6d7zmtk',
  },
  {
    date: '2020-08-16',
    description: 'Exodus 14: 13-14',
    preacher: PREACHERS.D_HICKMAN,
    scripture: 'Exodus 14: 13-14',
    title: 'God Will Fight Our Battles',
    youtubeId: 'JO_mKPqa4sg',
  },
  {
    date: '2020-08-09',
    description: 'Genesis 6:5-8 and Rev. 13: 5-8',
    preacher: PREACHERS.T_CURLEY,
    scripture: 'Genesis 6:5-8 and Rev. 13: 5-8',
    title: 'Everybody’s Going Through Something',
    youtubeId: '5I1Pe8hyV8Q',
  },
  {
    date: '2020-08-02',
    description:
      'Mark 9:2-10  We are living in a time of chaos and confusion. Therefore, it is necessary that we lift ' +
      'up our heads and open our eyes to experience the glory that God’s and God’s alone. Today’s message ' +
      'encourages us to do so!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Genesis 28:10-17',
    title: 'A Glimpse of Glory',
    youtubeId: 'G-IWmeMJf3s',
  },
  {
    date: '2020-07-26',
    description:
      'Genesis 28:10-17.  God’s ways are not our ways. We are not always aware that God is with us, however, ' +
      'when we least expect it, know that God is with us!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Genesis 28:10-17',
    title: 'When You Least Expect It, Expect It',
    youtubeId: 'fDaeW4mmVIE',
  },
  {
    date: '2020-07-19',
    description:
      'John 11:30-35 - All of us have experienced being moved to tears. These are not tears of joy, rather they ' +
      'are tears of pain and suffering. The good news is, we never cry alone because God through Jesus weeps with us!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 11:30-35',
    title: 'A Peek Into The Heart Of God',
    youtubeId: 'pdZxkWcG1Ho',
  },
  {
    date: '2020-07-12',
    description:
      'John16:25-33 -  We are living in chaotic times and it may feel as if all will be lost. However,  the Good ' +
      'News is that Jesus has overcome the world which gives us reason to rejoice!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 16:25-33',
    title: 'Overcoming The World',
    youtubeId: 'LpT1uHrFf7U',
  },
  {
    date: '2020-06-28',
    description:
      'Matthew 25:14-30  This is a service in recognition of all graduates. You were all born with ' +
      'specific gifts and talents. Today’s message encourages you to use your gifts and talents to make a ' +
      'difference in this world. When you fail to use your gifts and talents, you run the risk of losing them, and ' +
      'as a result the world also suffers a great loss.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Matthew 25:14-30',
    title: 'Use It Or Lose It',
    youtubeId: 'fwFj22DGuw4',
  },
  {
    date: '2020-06-21',
    description:
      'Psalm 23 - The prevailing opinion of psychologists is that fathers play an essential role in ' +
      'the lives of their children. Through the examination of the 23rd Psalm, this message speaks of the ' +
      'importance of a father’s role.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Psalm 23',
    title: 'Father’s Day - “A Reflection On The 23rd Psalm”',
    youtubeId: 'LPeZCzH7ca0',
  },
  {
    date: '2020-06-14',
    description:
      'II Kings 4:8-37  By all evidence our children face many challenges. As parents and caregivers, we must ' +
      'remember that their first impressions about the world, their values, and life itself comes from us. ' +
      'Therefore, “ Start children off on the way they should go, and even when they are old they will not ' +
      'leave it.” (Proverbs 22:6)',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'II Kings 4:8-37',
    title: 'Is It Well With the Children?',
    youtubeId: 'NxJywh2f_DM',
  },
  {
    date: '2020-06-07',
    description:
      'Psalm 100 - This Psalm expresses praise to God. We are living in a culture which is self-centered and ' +
      'self-directed. Praising God is a means of shifting our lives from self to centering ourselves on God. In so ' +
      'doing we become concerned about justice, freedom and equality for all.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Psalm 100',
    title: 'The Protest of Praise',
    youtubeId: '9pPt5yafh0I',
  },
  {
    date: '2020-05-30',
    description:
      'Acts 2: 1-13 - Jesus informed the disciples that without Him they could do nothing. Therefore, ' +
      'He promised them that God would send them another advocate. That advocate is the “Holy Spirit.”',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Acts 2: 1-13',
    title: 'Pentecost',
    youtubeId: 'hHIaxONs6v4',
  },
  {
    date: '2020-05-24',
    description:
      'John 14: 15-21  When the disciples were told that Jesus was leaving them, they were heartbroken ' +
      'and shattered. However, Jesus promised them that they would not be alone. They would comforted and ' +
      'empowered by “The Holy Spirit.”',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 14: 15-21',
    title: 'The Promise of The Holy Spirit',
    youtubeId: 'toTpl05RCXY',
  },
  {
    date: '2020-05-17',
    description:
      'Philippians 4:15-20 - We are living in times of scarcity due to Covid19. However we serve a God who is able ' +
      'to supply all our needs according to His riches in glory.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Philippians 4:15-20',
    title: 'Supplying Our Every Need',
    youtubeId: '3Q1VfZfuf-w',
  },
  {
    date: '2020-05-10',
    description:
      'II Kings: 4: 1-7 - “MOTHER’S DAY SERMON” - A mother is defined as a female who has borne offspring and ' +
      'exercises protective care. That protective care is essential in determining how her children will ' +
      'live out their lives.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'II Kings: 4: 1-7',
    title: 'The Importance of A Mother’s Oil',
    youtubeId: 'GDDqCBlu7_k',
  },
  {
    date: '2020-05-03',
    description:
      'Mark 11: 12-14; 20-25 - We were taught that there is power in prayer. However, we need to know how to approach' +
      ' prayer. This message teaches how to engage the power of prayer.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Mark 11: 12-14; 20-25',
    title: 'Engaging The Power of Prayer',
    youtubeId: 'lHLcCaL33A8',
  },
  {
    date: '2020-04-26',
    description:
      '1st John 3: 1-2 There are times when life becomes complicated. We wrestle with a variety of influences ' +
      'which causes us to forget who we are. When this happens, God calls us to “be still and remember who we are!”',
    preacher: PREACHERS.G_YEARGIN,
    scripture: '1st John 3: 1-2',
    title: 'Remembering Who We Are',
    youtubeId: 'FflhfJyEce4',
  },
  {
    date: '2020-04-19',
    description:
      'We are living in a time of great fear. This pandemic has disrupted our lifestyle and way of ' +
      'living. However there is One who speaks to us and can move us from fear to faith. Mark 6:45-51',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Mark 6:45-51',
    title: 'Spoken Beyond Fear',
    youtubeId: 'XQLNReiATwo',
  },
  {
    date: '2020-04-12',
    description:
      'Biblical scholars are in agreement that Mark’s Gospel ends with the women in fear because of what an angel ' +
      'told them when they reached the empty tomb. According to Mark out of fear, they told no one. This message ' +
      'tells the rest of the story!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Mark 16:1-8',
    title: 'Finishing The Unfinished Gospel',
    youtubeId: '-qk8yNI1XIs',
  },
  {
    date: '2020-04-09',
    description:
      'A Message for Maundy Thursday: All of us will know failure in our faith. But we have the assurance that ' +
      'when we fail, Christ has prayed for us.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 27:31-34',
    title: 'But I Have Prayed For You',
    youtubeId: 'oYi8THK6f44',
  },
  {
    date: '2020-04-05',
    description:
      'This sermon is about Jesus’ riding into Jerusalem on Palm Sunday.  He rides in as if He were a king. When in ' +
      'truth He is THE KING OF GLORY!',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Luke 19:28-40',
    title: 'The Triumphant Entry of Jesus Into Jerusalem',
    youtubeId: 'aO-U_Zh9of4',
  },
  {
    date: '2020-03-29',
    description:
      'A message from Psalms 27 that tells us what to do when we are fearful. Facing our fears requires waiting ' +
      'on the Lord.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'Psalm 27:1; 13-14',
    title: 'Alleviating Our Anxious Fears',
    youtubeId: '-bsGGeVUInM',
  },
  {
    date: '2020-03-22',
    description:
      'Given that we are facing a pandemic in these times, there is hope. And not just hope, but an indestructible ' +
      'hope. It is indestructible because it is grounded and founded in our God.',
    preacher: PREACHERS.G_YEARGIN,
    scripture: 'John 16:29-33',
    title: 'An Indestructible Hope',
    youtubeId: '3sgm_bRfXuw',
  },
]
  .reduce((videosToShow, videoData) => {
    const {
      date,
      expires = true,
      videoMissingMessage = 'No video for this date',
    } = videoData;

    // was told that videos up to 6 months ago would be available but they aren't
    // so I'm doing 5 months
    const withinFiveMonths = getNumberOfDaysAgo(date) < 150;
    if (isPast(parseISO(date)) && (withinFiveMonths || !expires)) {
      videosToShow.push({...videoData, videoMissingMessage});
    }

    return videosToShow;
  }, [])
  .sort((a, b) => a.date < b.date);

export default sermonVideos;
