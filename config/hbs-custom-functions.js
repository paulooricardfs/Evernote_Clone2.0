const handlebarsDateformat = require('handlebars-dateformat');

const hbsCustomFunctions = {
	counter: () => 1000,
	speaker: () => 'Hi Earth!!!',

	ifIn: (elem, list) => {
		if (!Array.isArray(list)) {
			return false;
		}
		if(list.indexOf(elem) > -1) {
    		return true;
  		} 

  		return false;
	},

	ifObjIn: (elem, list) => { 
		let result = false;

		if (!Array.isArray(list)) {
			return result;
		}
		if (!elem.hasOwnProperty('id')) {
			return result;
		}
		for(let i=0; i < list.length; i++) {
			if (!list[i].hasOwnProperty('id')) {
				break;
			}

			if (list[i].id == elem.id) {
				result = true;
				break;
			}
		}

  		return result;
	},

	filtraCate: (category_id, list) => {
		if(!Array.isArray(list)) {
			return [];
		}

		const result = list.filter(note => { return note.category_id == category_id });
		return result;
	},

	fromIsoToPtBr: (dateIso) => {
		//const createdAt = new Date(dateIso);
        // result = `${createdAt.getDay()}/${createdAt.getMonth()+1}/${createdAt.getFullYear()} ${createdAt.getHours()}:${createdAt.getMinutes()}`;
        
		const dateArr = dateIso.split("T");
        const date = dateArr[0].split("-");
        const time = dateArr[1].split(":");
        const result = "${date[2]}/${date[1]}/${date[0]} ${time[0]}:${time[1]}";

		return result;
	},
/*
	// Deprecated since version 0.8.0 
	Handlebars.registerHelper("formatDate", function(datetime, format) {

	// Use UI.registerHelper..
	UI.registerHelper("formatDate", function(datetime, format) {
	  if (moment) {
	    // can use other formats like 'lll' too
	    format = DateFormats[format] || format;
	    return moment(datetime).format(format);
	  }
	  else {
	    return datetime;
	  }
	})
*/
	/*
	formatDate: (date) => {
		var moment = require('moment');
	    return moment(date).format();
	},
	*/
	formatDate: (created_at) => {

		return (Date(created_at).toString('yyyy-MM-dd'));
	},


	prettifyDate: (timestamp) => {
	    var curr_date = timestamp.getDate();
	    var curr_month = timestamp.getMonth();
	    curr_month++;
	    var curr_year = timestamp.getFullYear();
	    result = "curr_date + .  + curr_month + .  + curr_year";
	    return result;
	},

	dateFormat: handlebarsDateformat
};

module.exports = hbsCustomFunctions;
