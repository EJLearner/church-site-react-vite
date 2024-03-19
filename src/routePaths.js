const handler = {
  get: (target, name) => {
    if (name in target) {
      return target[name];
    } else {
      throw new Error(`${name} is not a valid path constant`);
    }
  },
};

const ADMIN_PATH = '/admin/';

const ADMIN_PATHS = {
  ADMIN: ADMIN_PATH,

  ADMIN_CC: `${ADMIN_PATH}cc/`,
  ADMIN_EMAIL_SUBSCRIBERS: `${ADMIN_PATH}email-subscribers/`,
  ADMIN_EVENTS: `${ADMIN_PATH}events/`,
  ADMIN_VBS: `${ADMIN_PATH}vbs/`,
};

const MAIN_HOME_PATH = '/';

const MAIN_ROOT_PATHS = {
  MAIN_HOME: MAIN_HOME_PATH,

  BIBLE_STUDY: `${MAIN_HOME_PATH}bible-study/`,

  MAIN_ABOUT_US: `${MAIN_HOME_PATH}about-us/`,
  MAIN_CALENDAR: `${MAIN_HOME_PATH}calendar/`,
  MAIN_CONTACT: `${MAIN_HOME_PATH}contact/`,
  MAIN_CORONAVIRUS: `${MAIN_HOME_PATH}coronavirus/`,
  MAIN_CULTURE_AND_ARTS: `${MAIN_HOME_PATH}culture-and-fine-arts/`,
  MAIN_GED: `${MAIN_HOME_PATH}ged/`,
  MAIN_GIVING: `${MAIN_HOME_PATH}giving/`,
  MAIN_JUBILEE: `${MAIN_HOME_PATH}jubilee/`,
  MAIN_MEDITATIONS: `${MAIN_HOME_PATH}meditations/`,
  MAIN_MEMBERS_ONLY: `${MAIN_HOME_PATH}members-only/`,
  MAIN_MINISTRIES: `${MAIN_HOME_PATH}ministries/`,
  MAIN_NEWS: `${MAIN_HOME_PATH}news/`,
  MAIN_OUTREACH: `${MAIN_HOME_PATH}outreach/`,
  MAIN_SCHOLARSHIP: `${MAIN_HOME_PATH}scholarship`,
  MAIN_STREAM: `${MAIN_HOME_PATH}stream/`,
  MAIN_VOTING_INFORMATION: `${MAIN_HOME_PATH}voting/`,
  MAIN_WATCH: `${MAIN_HOME_PATH}watch/`,
  MAIN_WELCOME: `${MAIN_HOME_PATH}welcome/`,
  MAIN_ANNOUNCEMENTS: `${MAIN_HOME_PATH}announcements/`,
};

const {MAIN_CALENDAR} = MAIN_ROOT_PATHS;
const MAIN_CALENDAR_SUB_PATHS = {
  MAIN_CALENDAR_DAY: `${MAIN_CALENDAR}day/`,
  MAIN_CALENDAR_MONTH: `${MAIN_CALENDAR}month/`,
  MAIN_CALENDAR_UPCOMING: `${MAIN_CALENDAR}upcoming/`,
  MAIN_CALENDAR_WEEK: `${MAIN_CALENDAR}week/`,
  MAIN_CALENDAR_YEAR: `${MAIN_CALENDAR}year/`,
};
const {MAIN_JUBILEE} = MAIN_ROOT_PATHS;
const MAIN_JUBILEE_SUB_PATHS = {
  MAIN_JUBILEE_STORE: `${MAIN_JUBILEE}store`,
  MAIN_JUBILEE_50TH_ANNIVERSARY: `${MAIN_JUBILEE}50th-anniversary`,
  MAIN_JUBILEE_EVENT_CALENDAR: `${MAIN_JUBILEE}event-calendar`,
};

const CE_ROOT_PATHS = {
  CE_HOME: '/ce/',

  CE_CALENDAR: '/ce/calendar/',
  CE_CC_CHECKIN: '/ce/cc-checkin/',
  CE_CC_CHECKOUT: '/ce/cc-checkout/',
  CE_CC_REG_CHILD: '/ce/cc-registration-child/',
  CE_CC_REG_LANDING: '/ce/cc-registration-landing/',
  CE_CC_REG_VOLUNTEER: '/ce/cc-registration-volunteer/',
  CE_IDEA_FORM: '/ce/idea-form/',
  CE_THANK_YOU: '/ce/thank-you/',
  CE_VBS_CHECKIN: '/ce/vbs-checkin/',
  CE_VBS_CHECKOUT: '/ce/vbs-checkout/',
  CE_VBS_REG_ADULT: '/ce/vbs-registration-adult/',
  CE_VBS_REG_CHILD: '/ce/vbs-registration-child/',
  CE_VBS_REG_LANDING: '/ce/vbs-registration-landing/',
  CE_VBS_REG_STUDENT: '/ce/vbs-registration-student/',
  CE_VBS_REG_VOLUNTEER: '/ce/vbs-registration-volunteer/',
  CE_VISION: '/ce/vision/',
  CE_WHAT: '/ce/what/',
  CE_WHO: '/ce/who/',
  CE_WHY: '/ce/why/',
  CE_YOUTH: '/ce/youth/',
  OLD_PATHS_CE_IDEA_FORM: ['/ce/ideaform/'],
};

const {CE_CALENDAR} = CE_ROOT_PATHS;
const CE_CALENDAR_PATHS = {
  CE_CALENDAR_DAY: `${CE_CALENDAR}day/`,
  CE_CALENDAR_MONTH: `${CE_CALENDAR}month/`,
  CE_CALENDAR_UPCOMING: `${CE_CALENDAR}upcoming/`,
  CE_CALENDAR_WEEK: `${CE_CALENDAR}week/`,
  CE_CALENDAR_YEAR: `${CE_CALENDAR}year/`,
};

const {CE_VISION} = CE_ROOT_PATHS;
const CE_VISION_PATHS = {
  CE_VISION_PARTICIPANTS_2016: `${CE_VISION}participants-2016/`,
  CE_VISION_POWERPOINT: `${CE_VISION}powerpoint/`,
  CE_VISION_THE_VISION: `${CE_VISION}the-vision/`,
  CE_VISION_WORKGROUPS: `${CE_VISION}workgroups/`,
  OLD_PATHS_CE_VISION_PARTICIPANTS_2016: [`${CE_VISION}participants2016/`],
  OLD_PATHS_CE_VISION_THE_VISION: [`${CE_VISION}thevision/`],
};

const {CE_YOUTH} = CE_ROOT_PATHS;
const CE_YOUTH_PATHS = {
  CE_YOUTH_BIBLE_STUDY: `${CE_YOUTH}bible-study/`,
  CE_YOUTH_CHILDRENS_CHURCH: `${CE_YOUTH}childrens-church/`,
  CE_YOUTH_GODS_GIFTS: `${CE_YOUTH}gods-gifts/`,
  CE_YOUTH_SUNDAY_SCHOOL: `${CE_YOUTH}sunday-school/`,
  CE_YOUTH_USHERS: `${CE_YOUTH}ushers/`,
  CE_YOUTH_VACATION_BIBLE_SCHOOL: `${CE_YOUTH}vbs/`,
  OLD_PATHS_CE_YOUTH_CHILDRENS_CHURCH: [`${CE_YOUTH}childrenschurch/`],
  OLD_PATHS_CE_YOUTH_GODS_GIFTS: [`${CE_YOUTH}godsgifts/`],
  OLD_PATHS_CE_YOUTH_SUNDAY_SCHOOL: [`${CE_YOUTH}sundayschool/`],
};

const {CE_WHO} = CE_ROOT_PATHS;
const CE_WHO_PATHS = {
  CE_WHO_CHRISTIAN_ED_STAFF: `${CE_WHO}christian-ed-staff/`,
  CE_WHO_CTBC: `${CE_WHO}ctbc/`,
  CE_WHO_PASTOR: `${CE_WHO}pastor/`,
};

const ALL_PATHS = {
  ...ADMIN_PATHS,
  ...MAIN_ROOT_PATHS,
  ...MAIN_CALENDAR_SUB_PATHS,
  ...MAIN_JUBILEE_SUB_PATHS,
  ...CE_ROOT_PATHS,
  ...CE_CALENDAR_PATHS,
  ...CE_VISION_PATHS,
  ...CE_WHO_PATHS,
  ...CE_YOUTH_PATHS,
};

const routePaths =
  typeof Proxy !== 'undefined' ? new Proxy(ALL_PATHS, handler) : ALL_PATHS;

export default routePaths;
