$(function(){
	"use strict";
	
	var sect = $( window.location.hash ),
		portfolio = $('.portfolio-items');
	
	if(sect.length == 1){
		$('.section.active').removeClass('active');
		sect.addClass('active');
		if( sect.hasClass('border-d') ){
			$('body').addClass('border-dark');
		}
	}
	
	/*=========================================================================
		Magnific Popup (Project Popup initialization)
	=========================================================================*/
	$('.view-project').magnificPopup({
		type: 'inline',
		fixedContentPos: false,
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-zoom-in'
	});
	
	$(window).on('load', function(){
		$('body').addClass('loaded');
		
		/*=========================================================================
			Portfolio Grid
		=========================================================================*/
		portfolio.shuffle();
		$('.portfolio-filters > li > a').on('click', function (e) {
			e.preventDefault();
			var groupName = $(this).attr('data-group');
			$('.portfolio-filters > li > a').removeClass('active');
			$(this).addClass('active');
			portfolio.shuffle('shuffle', groupName );
		});
		
	});
	
	/*=========================================================================
		Navigation Functions
	=========================================================================*/
	$('.section-toggle').on('click', function(){
		var $this = $(this),
			sect = $( '#' + $this.data('section') ),
			current_sect = $('.section.active');
		if(sect.length == 1){
			if( sect.hasClass('active') == false && $('body').hasClass('section-switching') == false ){
				$('body').addClass('section-switching');
				if( sect.index() < current_sect.index() ){
					$('body').addClass('up');
				}else{
					$('body').addClass('down');
				}
				setTimeout(function(){
					$('body').removeClass('section-switching up down');			
				}, 2500);
				setTimeout(function(){
					current_sect.removeClass('active');
					sect.addClass('active');
				}, 1250);
				if( sect.hasClass('border-d') ){
					$('body').addClass('border-dark');
				}else{
					$('body').removeClass('border-dark');
				}
			}
		}
	});
	
	
	
	/*=========================================================================
		Contact Form
	=========================================================================*/
	$(document).ready(function() {
    	$('#contact-form').on('submit', function(e) {
        e.preventDefault(); 

        var formData = $(this).serialize(); 

        $.ajax({
            url: 'https://formspree.io/f/xzbnqkkk',
            method: 'POST',
            data: formData,
            dataType: 'json',
            success: function(data) {
                if (data.ok) { 
                    $('#contact-form-result').html(
                        "<div class='form-group' >\
                            <div class='alert alert-success' role='alert'> \
                                <strong>Mensagem Enviada!</strong> Entraremos em contato o mais breve possível.\
                            </div>\
                        </div>"
                    );
                    $('#contact-form').trigger('reset'); // Reseta o formulário após o envio
                } else {
                    $('#contact-form-result').html(
                        "<div class='form-group' >\
                            <div class='alert alert-danger' role='alert'> \
                                <strong>Oops!</strong> Desculpe, ocorreu um erro. Tente novamente.\
                            </div>\
                        </div>"
                    );
                }
            },
            error: function() {
                $('#contact-form-result').html(
                    "<div class='form-group' >\
                        <div class='alert alert-danger' role='alert'> \
                            <strong>Oops!</strong> Houve um problema com o serviço de envio. Tente novamente mais tarde.\
                        </div>\
                    </div>"
                );
            }
        });
    });
});

	
	
	
});
