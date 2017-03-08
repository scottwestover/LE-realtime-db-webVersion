 $(document).ready(function() {
   $('#QHglossary').hide();
   $('#EAglossary').hide();
   $('#CQglossary').hide();
   $('#SLAglossary').hide();
   $( "#aa-tab" ).click(function() {
     $('#EAglossary').hide();
     $('#QHglossary').hide();
     $('#CQglossary').hide();
     $('#ea-tab').removeClass("active");
     $('#qh-tab').removeClass("active");
     $('#cq-tab').removeClass("active");
     $('#sla-tab').removeClass("active");
     $('#AAglossary').show();
     $('#aa-tab').addClass("active");
   });
   $( "#ea-tab" ).click(function() {
     $('#QHglossary').hide();
     $('#AAglossary').hide();
     $('#CQglossary').hide();
     $('#SLAglossary').hide();
     $('#aa-tab').removeClass("active");
     $('#qh-tab').removeClass("active");
     $('#cq-tab').removeClass("active");
     $('#sla-tab').removeClass("active");
     $('#EAglossary').show();
     $('#ea-tab').addClass("active");
   });
   $( "#qh-tab" ).click(function() {
     $('#AAglossary').hide();
     $('#EAglossary').hide();
     $('#CQglossary').hide();
     $('#SLAglossary').hide();
     $('#ea-tab').removeClass("active");
     $('#aa-tab').removeClass("active");
     $('#cq-tab').removeClass("active");
     $('#sla-tab').removeClass("active");
     $('#QHglossary').show();
     $('#qh-tab').addClass("active");
   });
   $( "#cq-tab" ).click(function() {
     $('#AAglossary').hide();
     $('#EAglossary').hide();
     $('#QHglossary').hide();
     $('#SLAglossary').hide();
     $('#ea-tab').removeClass("active");
     $('#aa-tab').removeClass("active");
     $('#qh-tab').removeClass("active");
     $('#sla-tab').removeClass("active");
     $('#CQglossary').show();
     $('#cq-tab').addClass("active");
   });
   $('#sla-tab').click(function() {
     $('#AAglossary').hide();
     $('#EAglossary').hide();
     $('#QHglossary').hide();
     $('#CQglossary').hide();
     $('#ea-tab').removeClass("active");
     $('#aa-tab').removeClass("active");
     $('#qh-tab').removeClass("active");
     $('#cq-tab').removeClass("active");
     $('#SLAglossary').show();
     $('#sla-tab').addClass("active");
    });
 });