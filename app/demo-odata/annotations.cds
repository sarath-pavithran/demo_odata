using MyService as service from '../../srv/service';

annotate service.task with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'plant',
            Value : plant,
        },
        {
            $Type : 'UI.DataField',
            Label : 'SBG',
            Value : SBG,
        },
        {
            $Type : 'UI.DataField',
            Label : 'SBU',
            Value : SBU,
        },
    ]
);
annotate service.task with @(
    UI.FieldGroup #GeneratedGroup1 : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'plant',
                Value : plant,
            },
            {
                $Type : 'UI.DataField',
                Label : 'SBG',
                Value : SBG,
            },
            {
                $Type : 'UI.DataField',
                Label : 'SBU',
                Value : SBU,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup1',
        },
    ]
);
