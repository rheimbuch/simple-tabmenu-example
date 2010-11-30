// Wrap our plugin to ensure we can access
// jQuery as '$' even if 'noConflict' mode is
// enabled or some other library has stolen '$'.
(function($){
  // Add our plugin function to jquery
  $.fn.tabMenu = function() {
    
    // Find all links in 'this' node that have href="#someId"
    var menuLinks = this.find('a[href*="#"]');
    
    // Find the dom element pointed to by the 'href' attribute
    var targetFor = function(el) {
      var targetId = $(el).attr('href');
      return $(targetId);
    }
    
    // Resolve the link targets to elements in the page
    var menuTargets = menuLinks.map(function(){
      return targetFor(this).get(); // .get() strips the jquery wrapper
    });
    
    // Show the content targeted by a menu link
    var selectMenuLink = function(el) {
      // Make all menu links "inactive"
      menuLinks.removeClass('active');
      
      // Make this link 'active'
      $(el).addClass('active');
      
      // hide all menu targets
      menuTargets.hide();
      
      // show the target for this link
      targetFor(el).show();
    }
    
    
    // setup click events on all menu links
    menuLinks.each(function(){
      $(this).click(function(e){
        // select this menu link
        selectMenuLink(this);
        // inhibit default event behavior
        e.preventDefault();
      });
    });
    
    // show the first menu link by default
    selectMenuLink(menuLinks.first());
  };
})(jQuery);