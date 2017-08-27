function isset(v){
	let context = `  
		var retorno = (typeof ${v} !== 'undefined') ? true : false;
		return retorno;
	`;
	const generate = new Function('', context);
	return generate();
}

function utf8_encode(s) {
  return unescape(encodeURIComponent(s));
}

function utf8_decode(s) {
  return decodeURIComponent(escape(s));
}

export {isset, utf8_encode, utf8_decode};