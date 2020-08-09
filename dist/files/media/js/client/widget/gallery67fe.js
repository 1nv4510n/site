var Gallery = function Gallery(params){
    this.id = params.id;
    this.scrollTime = params.scrollTime && params.scrollTime>0 ? params.scrollTime : undefined;

    this.container = jq_144('#' + this.id + ' .gallery-container');
    this.prevNode = jq_144('#' + this.id + ' .gallery-prev');
    this.nextNode = jq_144('#' + this.id + ' .gallery-next');

    this.init();
};

Gallery.prototype.move = function(number){
    number = number || 0;
    var states = this.states;
    var state = this.container.css('left');
    var pos = states.indexOf(state) + number;
    if(pos == -1){
        pos = states.length - 1;
    } else if(pos == states.length){
        pos = 0;
    }
    this.container.animate({
            'left' : states[pos]},
        500
    );
};

Gallery.prototype.init = function(){
    var container = this.container;

    var w = container.width();
    var h = container.parent().height();
    var childs = container.find('> a');

    var margT = 0;
    if(childs.length > 1){
        margT = childs.eq(1).outerWidth(true) - childs.eq(1).outerWidth();
    }
    var w2 = margT + childs.eq(0).width();

    var clen = childs.length / Math.floor((w+margT)/w2);

    container
        .css('height', h + 'px')
        .css('width', w * (clen + 1) + 'px')
        .css('left', '0px');

    var states = this.states = [];
    for(var i =0; i < clen;i++){
        states.push(-i*(w+margT) + 'px');
    }

    var that = this;
    this.prevNode.click(function(e){
        e.preventDefault();
        that.move(-1);
    });
    this.nextNode.click(function(e){
        e.preventDefault();
        that.move(1);
    });
    if(this.scrollTime){
        setInterval(function(){
            that.move(1);
        }, this.scrollTime * 1000);
    }
    childs.filter('[href]').fancybox({
        helpers	: {
            title	: {
                type: 'outside'
            },
            thumbs	: {
                width	: 50,
                height	: 50
            }
        }
    });

};

widget.init('gallery', Gallery);