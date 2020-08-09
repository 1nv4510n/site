var Slider = function Slider(params){
    this.id = params.id;
    this.init();
};

Slider.prototype.init = function(){
    var container = jq_144('#' + this.id + ' .slides-container');
    var w = container.width();

    var childs = container.find('> div');
    var clen = childs.length;

    var bordT = childs.eq(0).outerWidth() - childs.eq(0).innerWidth();
    var paddT = childs.eq(0).innerWidth() - childs.eq(0).width();
    var margT = childs.eq(0).outerWidth(true) - childs.eq(0).outerWidth();

    var w2 = w - bordT - paddT - margT;

    container
        .css('height', '176px')
        .css('width', w * (clen + 1) + 'px')
        .css('left', '0px');


    container.find('> div')
        .css('width', w2 + 'px')
        .css('float', 'left');

    childs.show();

    var states = [];
    for(var i =0; i < clen;i++){
        states.push(-i*w + 'px');
    }

    jq_144('#' + this.id + ' .prev-slide').click(function(e){
        var state = container.css('left');
        var pos = states.indexOf(state) - 1;
        if(pos == -1){
            pos = states.length - 1;
        }
        container.animate({
            'left' : states[pos]},
            500
        );
        return false;
    });
    jq_144('#' + this.id + ' .next-slide').click(function(e){
        var state = container.css('left');
        var pos = states.indexOf(state) + 1;
        if(pos == states.length){
            pos = 0;
        }
        container.animate({
            'left' : states[pos]},
            500
        );
        return false;
    });

};

widget.init('slider', Slider);