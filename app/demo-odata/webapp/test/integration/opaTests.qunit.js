sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'demoodata/test/integration/FirstJourney',
		'demoodata/test/integration/pages/taskList',
		'demoodata/test/integration/pages/taskObjectPage'
    ],
    function(JourneyRunner, opaJourney, taskList, taskObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('demoodata') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThetaskList: taskList,
					onThetaskObjectPage: taskObjectPage
                }
            },
            opaJourney.run
        );
    }
);