require(['gitbook', 'jquery'], function(gitbook, $) {
    var fontState;

    var FAMILY = {
        'serif': 0,
        'sans': 1
    };

    // Save current font settings
    function saveFontSettings() {
        gitbook.storage.set('fontState', fontState);
        update();
    }

    // Increase font size
    function enlargeFontSize(e) {
        e.preventDefault();
        if (fontState.size >= 4) return;

        fontState.size++;
        saveFontSettings();
    }

    // Decrease font size
    function reduceFontSize(e) {
        e.preventDefault();
        if (fontState.size <= 0) return;

        fontState.size--;
        saveFontSettings();
    }

    // Change font family
    function changeFontFamily(index, e) {
        e.preventDefault();

        fontState.family = index;
        saveFontSettings();
    }

    function update() {
        var $book = gitbook.state.$book;

        $('.font-settings .font-family-list li').removeClass('active');
        $('.font-settings .font-family-list li:nth-child('+(fontState.family+1)+')').addClass('active');

        $book[0].className = $book[0].className.replace(/\bfont-\S+/g, '');
        $book.addClass('font-size-'+fontState.size);
        $book.addClass('font-family-'+fontState.family);
    }

    function init(config) {
        // Instantiate font state object
        fontState = gitbook.storage.get('fontState', {
            size: config.size || 2,
            family: FAMILY[config.family || 'sans'],
        });

        update();
    }


    gitbook.events.bind('start', function(e, config) {
        var opts = config.fontsettings;

        // Create buttons in toolbar
        gitbook.toolbar.createButton({
            icon: 'fa fa-font',
            label: 'Font Settings',
            className: 'font-settings',
            dropdown: [
                [
                    {
                        text: 'A',
                        className: 'font-reduce',
                        onClick: reduceFontSize
                    },
                    {
                        text: 'A',
                        className: 'font-enlarge',
                        onClick: enlargeFontSize
                    }
                ],
                [
                    {
                        text: 'Serif',
                        onClick: function(e) { return changeFontFamily(0, e); }
                    },
                    {
                        text: 'Sans',
                        onClick: function(e) { return changeFontFamily(1, e); }
                    }
                ]
            ]
        });


        // Init current settings
        init(opts);
    });
});
