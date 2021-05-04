$( document ).ready(function() {
	
	$.fn.getType = function(){ return this[0].tagName == "INPUT" ? this[0].type.toLowerCase() : this[0].tagName.toLowerCase(); }
  // Handler for .ready() called.
	$('.filter-select').selectric();
	
	$.fn.datepicker.dates['fr'] = {
        days: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
        daysShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
        daysMin: ["d", "l", "ma", "me", "j", "v", "s"],
        months: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
        monthsShort: ["janv.", "févr.", "mars", "avril", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
        today: "Aujourd'hui",
        monthsTitle: "Mois",
        clear: "Effacer",
        weekStart: 1,
        format: "dd/mm/yyyy"
        };
  	$('.dateP').datepicker({
		format: 'dd/mm/yyyy',
		startDate: new Date(),
		language: 'fr',
		autoclose: true,
	})
	.on('changeDate', function(e) {
		console.log(e.date);
		date = e.date.setDate(e.date.getDate() + 1);
		$('.dateR').datepicker('setStartDate', e.date );
		$('.dateR').datepicker('setDate', e.date );
    });
	$('.dateR').datepicker({
		format: 'dd/mm/yyyy',
		startDate: new Date(),
		language: 'fr',
		autoclose: true,
	});
	
	$('.datePt').datepicker({
		format: 'dd/mm/yyyy',
		startDate: new Date(),
		language: 'fr',
		autoclose: true,
	})
	.on('changeDate', function(e) {
		console.log(e.date);
		date = e.date.setDate(e.date.getDate() + 0);
		$('.dateRt').datepicker('setStartDate', e.date );
		$('.dateRt').datepicker('setDate', e.date );
    });
	$('.dateRt').datepicker({
		format: 'dd/mm/yyyy',
		startDate: new Date(),
		language: 'fr',
		autoclose: true,
	});
	
	$("#agencePrise").change(function() {
		
		
		if(!$(".restitution-diff").is(':checked')) {
			$("#agenceRestitution")[0].selectedIndex = $("#agencePrise")[0].selectedIndex;
			//$('#agenceRestitution').selectric();
		}
	});
	$(".restitution-diff").change(function() {
		if(this.checked) {
			$('.agence-restitution').show();
		}
		else
		{
			$('.agence-restitution').hide();
			$("#agenceRestitution")[0].selectedIndex = $("#agencePrise")[0].selectedIndex;
			//$('#agenceRestitution').selectric();
		}
	});
	$('.loc-option').on('change', function(e) {
		total=$('#total-sum').data('total-display');
		total=parseFloat(total);
		$( ".tarifs" ).html('');
		$( ".loc-option" ).each( function( index, element ){
			type = $( this ).getType();
			//console.log(type);
			addOption  = false;
			if(type=='checkbox' || type=='radio')
			{
				if($( this ).is(':checked'))
					addOption  = true;
			}
			else
			{
				if($( this ).val() > 0)
					addOption  = true;
			}
			if(addOption == true)
			{
				quantiteOption = '';
				if($( this ).val() > 1 && !$( this ).hasClass('insurance-select'))
					quantiteOption = $( this ).val() + 'x ';
				$( ".tarifs" ).append('<p class="CfgReceiptSummary__summaryItemDetail"> <span class="CfgReceiptSummary__PresentationItemLabel">'+quantiteOption+$( this ).data('name')+'</span><span class="CfgReceiptSummary__PresentationItemDots"></span> <span class="CfgReceiptSummary__summaryPriceNumber">'+ $( this ).data('price-display') + ' ' + $( this ).data('price-devise') +'</span> </p>');
				total+=parseFloat($( this ).data('price-display'));
			}
			//console.log(addOption );
		});
		$('#total-sum').html($('#total-sum').data('total-devise')+' ' + total)
		//alert('Success!');
	});
	$('.car-choice').on('click', function(e) {
		v=$(this).data('v');
		$('#choix').val(v);
		$('#frm-reservation').submit();
		//alert('Success!');
	});
	$('.transfert-choice').on('click', function(e) {
		$(this).parents('.frm-reservation').submit();
	});
	function leapYear(year) {
		return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
	}
	$.validator.addMethod('checkBirthDate', function (value, element, param) {
		
		day = $('#driver_birth_day').val();
		month = $('#driver_birth_month').val();
		year = $('#driver_birth_year').val();
		laDate = day + '/' + month + '/' + year;
		
		var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        var days = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
        if (months.indexOf(month) != -1 && days.indexOf(day) != -1) {
            if ((month == '02' && day == '29' && leapYear(year) == false) || (month == '02' && day == '30') || (month == '02' && day == '31') || (month == '04' && day == '31') || (month == '06' && day == '31') || (month == '09' && day == '31') || (month == '11' && day == '31')) {
                return false;
            } else {
                var GivenDate = year + '-' + month + '-' + day;
                var CurrentDate = new Date();
                GivenDate = new Date(GivenDate);
                if (GivenDate > CurrentDate) {
                    return false;
                } else {
                    return true;
                }
            }
        } else {
            return false;
        }
		
		
		/*var reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
		if (laDate.match(reg)) 
			isValid = true;	
		else 
			isValid = false;	
		
		*/
		/*var dateString = "23/10/2015"; // Oct 23
		var dateParts = dateString.split("/");
		// month is 0-based, that's why we need dataParts[1] - 1
		var dateObject = new Date(+year, month - 1, +day);
		*/
		//console.log(laDate + '*****' + isValid);
		return isValid; // return bool here if valid or not.
	}, '');

	$("#frm-confirmation").validate({
		// Specify validation rules
		errorClass: 'error-input',
		highlight: function(element, errorClass, validClass) {
		  $(element).parent("div").addClass("error-div");
		  $(element).parents(".selectric-wrapper").addClass("error-div");
	
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).parents(".error-div").removeClass("error-div");
		},
		errorPlacement: function(error, element) {
				error.appendTo( element.parents(".liste-assurance") );
		  },
		rules: {
		  // The key name on the left side is the name attribute
		  // of an input field. Validation rules are defined
		  // on the right side
		  driver_birth_day: {checkBirthDate: true},
		  driver_birth_month: {checkBirthDate: true},
		  driver_birth_year: {checkBirthDate: true},
		  assurance: "required",
		  driver_email: {
			required: true,
			// Specify that email should be validated
			// by the built-in "email" rule
			email: true
		  }
		},
		// Specify validation error messages
		messages: {
		  assurance: "Veuillez choisir votre assurance",
		  driver_title: "",
		  driver_lastname: "",
		  driver_firstname: "",
		  driver_phone: "",
		  driver_email: {
			required: "",
			email: ""
		  },
		  email: "Please enter a valid email address"
		},
		// Make sure the form is submitted to the destination defined
		// in the "action" attribute of the form when valid
		submitHandler: function(form) {
		  form.submit();
		}
	  });
	  
	  $("#frm-contact").validate({
		// Specify validation rules
		errorClass: 'error-input',
		highlight: function(element, errorClass, validClass) {
		  $(element).parent("div").addClass("error-div");
		  $(element).parents(".selectric-wrapper").addClass("error-div");
	
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).parents(".error-div").removeClass("error-div");
		},
		errorPlacement: function(error, element) {
				error.appendTo( element.parents(".liste-assurance") );
		  },
		rules: {
		  // The key name on the left side is the name attribute
		  // of an input field. Validation rules are defined
		  // on the right side
		  
		  contact_email: {
			required: true,
			// Specify that email should be validated
			// by the built-in "email" rule
			email: true
		  }
		},
		// Specify validation error messages
		messages: {
		  contact_title: "",
		  contact_lastname: "",
		  contact_firstname: "",
		  contact_phone: "",
		  contact_message: "",
		  contact_email: {
			required: "",
			email: ""
		  },
		  email: "Please enter a valid email address"
		},
		// Make sure the form is submitted to the destination defined
		// in the "action" attribute of the form when valid
		submitHandler: function(form) {
			if(grecaptcha.getResponse() == "") {
				recaptchaerror()
				//alert("You can't proceed!");
			} else {
				form.submit();
			}
		  
		}
	  });
	  function recaptchaerror()
	  {
		  $("#captcha iframe").addClass('captcha-error');
	  }
	$(".filter-select").change(function() {
		$(".car-result").show();
		reinit = 0;
		$( ".filter-select" ).each( function( index, element ){
			tag = $(this).data('tag');
			values = $(this).val();
			if(values.length > 0)
			{
				reinit = 1;
				$(".car-result").each( function( index, element ){
					tagVal = $(this).attr(tag);
					if(values.indexOf(tagVal) !== -1){
						//alert("Value exists!")
					} else{
						$(this).hide()//alert("Value does not exists!")
					}
				});
			}
			//console.log($(".car-result").filter("["+tag+" = 1]"));
		});
		if(reinit)
			$(".reinit-filter").html($(".reinit-filter").attr('label'));
	});
	$(".reinit-filter").click(function() {
		event.preventDefault();
		$('.filter-select').prop('selectedIndex', -1);
		$('.filter-select').selectric();
		//$('.filter-select').selectric('refresh');
		$(".car-result").show();
		$(".reinit-filter").html('');
		
	});
	$(".popup-voiture").click(function() {		 
		$('#voiture').val($(this).data('voiture'));		
	});
	$(".filter-show").click(function() {		 
		$('.filter-row').toggleClass('visible-lg');		
		$('.filter-arrow').toggleClass('fa-sort-down').toggleClass('fa-sort-up');
	});
	$(".search-show").click(function() {		 
		$('.search-lg').toggleClass('visible-lg');		
		$(this).parent().hide().removeClass('visible-md visible-xs visible-sm');
		$('.search-arrow').toggleClass('fa-sort-down').toggleClass('fa-sort-up');
	});
	/*********************************************/
	$(".allerretour").change(function() {
		if($('.allerretour:checked').val() == 1) {
			$('.dateRetour').show();
			$('.transfetLieux').removeClass('col-lg-2').addClass('col-lg-3');
		}
		else
		{
			$('.dateRetour').hide();
			$('.transfetLieux').removeClass('col-lg-3').addClass('col-lg-2');
			//$('#agenceRestitution').selectric();
		}
	});
	$("#frm-profil").validate({
		// Specify validation rules
		errorClass: 'error-input',
		highlight: function(element, errorClass, validClass) {
		  $(element).parent("div").addClass("error-div");
		  $(element).parents(".selectric-wrapper").addClass("error-div");
	
		},
		unhighlight: function(element, errorClass, validClass) {
		  $(element).parents(".error-div").removeClass("error-div");
		},
		errorPlacement: function(error, element) {
				error.appendTo( element.parents(".liste-assurance") );
		  },
		rules: {
		  // The key name on the left side is the name attribute
		  // of an input field. Validation rules are defined
		  // on the right side
		  driver_birth_day: {checkBirthDate: true},
		  driver_birth_month: {checkBirthDate: true},
		  driver_birth_year: {checkBirthDate: true},
		  assurance: "required",
		  driver_email: {
			required: true,
			// Specify that email should be validated
			// by the built-in "email" rule
			email: true
		  }
		},
		// Specify validation error messages
		messages: {
		  assurance: "Veuillez choisir votre assurance",
		  driver_title: "",
		  driver_lastname: "",
		  driver_firstname: "",
		  driver_phone: "",
		  driver_email: {
			required: "",
			email: ""
		  },
		  email: "Please enter a valid email address"
		},
		// Make sure the form is submitted to the destination defined
		// in the "action" attribute of the form when valid
		submitHandler: function(form) {
		  form.submit();
		}
	  });
	
	
	lazyload();	
});
$( document ).ready(function() {	
	
});