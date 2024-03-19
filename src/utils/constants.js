const COOKIE_KEYS = {
  CART_DATA: 'cart-data',
};

const dateConstants = {
  DATE_FNS_DISPLAY_DATE_FORMAT: 'M/d/yyyy',
  DATE_FNS_INTERNAL_DATE_FORMAT: 'yyyy-MM-dd',
  DISPLAY_DATE_FORMAT: 'M/D/YYYY',
  DISPLAY_TIME_FORMAT: 'M/D/YY h:mm a',
  INTERNAL_DATE_FORMAT: 'YYYY-MM-DD',
  INTERNAL_TIMESTAMP_FORMAT: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  VALID_INPUT_DATE_FORMATS: ['M/D/YY', 'M/D/YYYY', 'M-D-YYYY', 'M-D-YY'],
};

const FEATURE_FLAGS = {
  ANNIVERSARY_STORE: 'ANNIVERSARY_STORE',
};

const constants = {
  NBSP: '\u00a0',
  ...dateConstants,

  CC_LOGBOOK_REF_NAME: 'ccLogbook',
  CC_REGISTERED_CHILDREN_REF_NAME: 'ccRegisteredChildren',
  CC_REGISTERED_CHILD_ID_PROP: 'ccRegisteredId',
  CC_REGISTERED_VOLUNTEER_ID_PROP: 'ccRegisteredVolunteersId',
  CC_REGISTERED_VOLUNTEER_REF_NAME: 'ccRegisteredVolunteers',
  CC_REGISTRY_ACCESS_REF_NAME: 'user_groups/ccRegAccess',

  COOKIE_KEYS,

  FEATURE_FLAGS,

  FB_REF_EVENTS: 'dates',

  PREACHERS: {
    D_NELSON: 'Rev. Donnell Nelson',
    D_HICKMAN: 'Rev. Debra Hickman-Arnette',
    G_YEARGIN: 'Rev. Dr. Grady A Yeargin, Jr.',
    L_FORD: 'Minister Lori Ford',
    M_HAMIEL: 'Rev. Michelle Hamiel',
    MINISTERS: 'City Temple Ministers', // use when multiple ministers are in video
    P_YEARGIN: 'Minister Patricia Ann Yeargin',
    T_CURLEY: 'Rev. Tyra Curley',
  },

  BIBLE_VERSIONS: {
    KJV: 'KJV',
    NIV: 'NIV',
    NRSV: 'NRSV',
    NLT: 'NLT',
    NRSVUE: 'NRSVUE',
  },

  BIBLE_VERSIONS_INFO: {
    ESV: {long: 'English Standard Version', short: 'ESV'},
    KJV: {long: 'King James Version', short: 'KJV'},
    NIV: {long: 'New International Version', short: 'NIV'},
    NRSV: {long: 'New Revised Standard Version', short: 'NRSV'},
    NRSVUE: {
      long: 'New Revised Standard Version UPDATED EDITION',
      short: 'NRSVUE',
    },
    NLT: {long: 'New Living Translation', short: 'NLT'},
  },

  SLENDER_ARROW_LEFT: '‹',
  SLENDER_ARROW_RIGHT: '›',

  SORT_DIRECTION_ASCENDING: 'asc',
  SORT_DIRECTION_DESCENDING: 'des',

  SUBSCRIBED_EMAILS_REF_NAME: 'subscribedEmails',

  VIEWS: {
    CART: 'cart',
    QUANTITY_SELECT: 'quantitySelect',
    STORE_FRONT: 'storeFront',
  },

  VBS_LOGBOOK_REF_NAME: 'vbsLogbook',
  VBS_REGISTERED_CHILDREN_REF_NAME: 'vbsRegisteredChildren',
  VBS_REGISTERED_CHILD_ID_PROP: 'vbsRegisteredChildrenId',
  VBS_REGISTERED_STUDENT_ID_PROP: 'vbsRegisteredStudentId',
  VBS_REGISTERED_STUDENT_REF_NAME: 'vbsRegisteredStudents',
  VBS_REGISTERED_VOLUNTEER_ID_PROP: 'vbsRegisteredVolunteersId',
  VBS_REGISTERED_VOLUNTEER_REF_NAME: 'vbsRegisteredVolunteers',
  VBS_REGISTRY_ACCESS_REF_NAME: 'user_groups/vbsRegAccess',
};

export default constants;
