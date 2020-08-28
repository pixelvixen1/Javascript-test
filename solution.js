const add = (...args) => args.reduce((acc, val) => acc + val, 0);

const deepClone = value => {
  if (Array.isArray(value)) {
    return value.map(deepClone);
  }
  if (typeof value === 'object') {
    const obj = {};
    Object.keys(value).forEach(key => {
      obj[key] = deepClone(value[key]);
    })
    return obj;
  }
  return value;
}

const listToObject = arr =>
  deepClone(arr).reduce((obj, val) => {
    obj[val['name']] = val['value'];
    return obj;
  }, {})


const objectToList = obj => {
  const copy = deepClone(obj);
  const result = [];
  Object.keys(obj).forEach(key => {
    result.push({name: key, value: copy[key]});
  })
  return result;
}


const extractPropIndexKeyOrValue = key => {

  const rx = /^([a-zA-Z]+)([0-9]+)_([a-zA-Z]+)$/;

  let result;
  if (result = rx.exec(key)) {
    return {
      arrName: result[1],
      index: result[2],
      prop: result[3]
    }
  }
}

const isStringDate = str => new Date( parseInt(str.slice(2)) ).getTime() > 0;

const deserialize = obj => {
  const result = {};

  Object.keys(obj).forEach(key => {

    const p = extractPropIndexKeyOrValue(key);

    if(p){

      if (!result[p.arrName]) {
        result[p.arrName] = [];
      }

      if (!result[p.arrName][p.index]) {
        result[p.arrName][p.index] = {};
      }

      if(typeof obj[key] !== 'object'){

        if(typeof obj[key] === 'string' && isStringDate(obj[key]) ){
          const date = new Date( parseInt(obj[key].slice(2)) );
          //const dateStr = date.toLocaleDateString("en-GB") - this is returning the US format MM/DD/YYYY I do not know why :(
          const dateStr = `${date.getDate()}/${(date.getMonth()+1).toString.length === 1 ? `0${date.getMonth()+1}` : date.getMonth()+1}/${date.getFullYear()}`;
          result[p.arrName][p.index][p.prop] = dateStr;
        }
        else{
          result[p.arrName][p.index][p.prop] = obj[key];
        }

      }
      else if(typeof obj[key] === 'object'){
        result[p.arrName][p.index][p.prop] = deserialize( obj[key] );
      }

    }
    else{
      if(!result[key]){
        result[key] = obj[key];
      }
    }

  })

  return result;
}


module.exports = {
  add,
  listToObject,
  deserialize,
  objectToList
}


