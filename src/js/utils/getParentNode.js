const getParentNode = ( target, tagName ) => {
  if( !tagName ) throw new Error("tagName can't be empty");
  tagName = tagName.toUpperCase();

  while( target.tagName ) {
    if( target.tagName === tagName ) return target;
    else target = target.parentElement;
  }
};

export default getParentNode;