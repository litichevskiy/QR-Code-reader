import getParentNode from '../utils/getParentNode';
const INVALID_DATA_ROLE = 'HTML element must have "data-role" attribute';
const INVALID_DATA_ID = 'HTML element must have "data-id" attribute';
const CLASSNAME_ACTIVE_TAB = 'tab-active';
const CLASSNAME_ACTIVE_BUTTON = 'btn-active';

class TabNavigation{
  constructor({ container, activeTabId, tabList }) {
    this.container = container;
    this.activeTabId = activeTabId;
    this.activeTab = tabList[ activeTabId ];
    this.tabsStorage = createTabsStorage( tabList );
    this.activeButton = this.container.querySelectorAll('button')[ activeTabId ];

    toggleClass( this.activeTab, CLASSNAME_ACTIVE_TAB );
    toggleClass( this.activeButton, CLASSNAME_ACTIVE_BUTTON );
    this.changeActiveTab = this.changeActiveTab.bind( this );
    this.container.addEventListener('click', this.changeActiveTab );
  }

  changeActiveTab({ target }) {
    if( target === this.container ) return;

    target = getParentNode( target, 'button' );
    const role = target.getAttribute('data-role');
    if( !role ) throw new Error( INVALID_DATA_ROLE );

    this.setActiveTab( role );
    this.setActiveButton( target );
  }

  setActiveButton( btn ) {
    toggleClass( this.activeButton, CLASSNAME_ACTIVE_BUTTON );
    toggleClass( btn, CLASSNAME_ACTIVE_BUTTON );
    this.activeButton = btn;
  }

  setActiveTab( key ) {
    const tab = this.tabsStorage[key];
    if( tab === this.activeTab ) return;

    toggleClass( this.activeTab, CLASSNAME_ACTIVE_TAB );
    toggleClass( tab, 'tab-active', CLASSNAME_ACTIVE_TAB );
    this.activeTab = tab;
  }
};

const toggleClass = ( elem, className ) => elem.classList.toggle( className );

const createTabsStorage = ( list ) => {
  return list.reduce(( accumulator, tab ) => {
    const id = tab.getAttribute('data-id');
    if( !id ) throw new Error( INVALID_DATA_ID );
    accumulator[id] = tab;
    return accumulator;
  }, {});
};

export default TabNavigation;