jQuery(function( $ ) {

    var g = new Genius();
    var cm = new CssClassManager();

    $('#genius .box').on({
        mouseenter: function() {
            if (g.isKeysEnabled()) {
                $(this).addClass('on');
            }
        },
        mouseleave: function() {
            if (g.isKeysEnabled()) {
                $(this).removeClass('on');
            }
        },
        click: function(e) {
            e.preventDefault();
        }
    });

    $('#start').click(function() {
        g.startGame($(this));
    });

});

function Genius()
{
    var random = new Random();

    this.colors = ['red', 'green', 'yellow', 'blue'];
    this.sequence = [];
    this.start = false;
    this.keysEnabled = false;

    function Genius()
    {
        random.setRandomGlobalRange(0, 3);
    }

    this.startGame = function(startButton)
    {
        this.sequence[0] = random.getRandomInt(0, (this.colors.length - 1));
        this.sequence.push(random.getRandomInt(0, (this.colors.length - 1)));
        this.sequence.push(random.getRandomInt(0, (this.colors.length - 1)));
        var sequence = this.sequence;
        var animateColor = this.animateColor();
        startButton.fadeOut('slow', function() {
            this.start = true;
            animateColor;
        });
    }

    this.nextMovement = function()
    {
        this.sequence.push(random.getRandomInt());
    }

    this.animateColor = function()
    {
        var i = 0;
        var sequence = this.sequence;
        var colors = this.colors;
        var timeAnimation = 1000; // milliseconds
        var sequenceAnimation = setInterval(function() {
            if (i < sequence.length) {
                $('#genius #' + colors[sequence[i]]).addClass('on');
            } else {
                clearInterval(sequenceAnimation);
            }
            setTimeout(function() {
                console.log(i);
                console.log(sequence.length + "\n");
                $('#genius #' + colors[sequence[i-sequence.length]]).removeClass('on');
            }, 100);
            i++;
        }, timeAnimation);
    }

    this.isGameStarted = function()
    {
        return this.start;
    }

    this.isKeysEnabled = function()
    {
        return this.keysEnabled;
    }

    Genius();
}

function Random()
{
    this.randomGlobalRange = {'min': 0, 'max': 3};

    this.getRandomInt = function()
    {
        return Math.floor(Math.random() * (this.randomGlobalRange.max - this.randomGlobalRange.min + 1)) + this.randomGlobalRange.min;
    }

    this.setRandomGlobalRange = function()
    {

    }
}

function CssClassManager(element)
{
    this.element = element;

    this.CssClassManager = function()
    {
        if (element == undefined) {
            this.element = null;
        }
    }

    this.setElement = function(element) {
        this.element = element;
    }

    this.getColor = function(cssClass) {
        var color = '';

        if (cssClass.indexOf('red') != -1) {
            color = 'red';
        } else if (cssClass.indexOf('green') != -1) {
            color = 'green';
        } else if (cssClass.indexOf('yellow') != -1) {
            color = 'yellow';
        } else if (cssClass.indexOf('blue') != -1) {
            color = 'blue';
        }

        return color;
    }

    CssClassManager();
}
