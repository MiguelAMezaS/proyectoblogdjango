// Botón para Ir Arriba
jQuery.noConflict();
jQuery(document).ready(function () {
    jQuery("#Boton-ir-arriba").hide();
    jQuery(function () {
        jQuery(window).scroll(function () {
            if (jQuery(this).scrollTop() > 200) {
                $('#Boton-ir-arriba').addClass('et-animate__backInRight').removeClass('et-animate__backInLeft');
                jQuery('#Boton-ir-arriba').fadeIn();
            } else {
                $('#Boton-ir-arriba').addClass('et-animate__backInLeft').removeClass('et-animate__backInRight');
                jQuery('#Boton-ir-arriba').fadeOut();
            }
        });
        jQuery('#Boton-ir-arriba').click(function () {
            jQuery('body,html').animate({
                scrollTop: 0
            }, 400);
            return false;
        });
    });
});