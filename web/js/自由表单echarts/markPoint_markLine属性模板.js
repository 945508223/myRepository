model = {
    markPoint: {
        symbol: 'ds_series_markPoint_symbol|STRING',
        symbolSize: 'ds_series_markPoint_symbolSize|NUMBER',
        symbolRotate: 'ds_series_markPoint_symbolRotate|NUMBER',
        label: {
            show: 'ds_series_markPoint_label_show|BOOLEAN',
            position: 'ds_series_markPoint_label_position|STRING',
            distance: 'ds_series_markPoint_label_distance|NUMBER',
            rotate: 'ds_series_markPoint_label_rotate|NUMBER',
            color: 'ds_series_markPoint_label_color|STRING',
            fontStyle: 'ds_series_markPoint_label_fontStyle|STRING',
            fontWeight: 'ds_series_markPoint_label_fontWeight|STRING',
            fontFamily: 'ds_series_markPoint_label_fontFamily|STRING',
            fontSize: 'ds_series_markPoint_label_fontSize|NUMBER',
            align: 'ds_series_markPoint_label_align|STRING',
            verticalAlign: 'ds_series_markPoint_label_verticalAlign|STRING',
        },

        data: [{
            type: 'ds_series_markPoint_data_type|STRING',
            valueIndex: 'ds_series_markPoint_data_valueIndex|NUMBER',
            x: 'ds_series_markPoint_data_x|STRING',
            y: 'ds_series_markPoint_data_y|STRING',

        }],
    },
    markLine: {
        // data: [{
        //     type: ds_series_markLine_data_type,
        // }],
        data: [ds_series_markLine_data],
        silent: ds_series_markLine_silent,
        symbol: ds_series_markLine_symbol,
        symbolSize: ds_series_markLine_symbolSize,
        precision: ds_series_markLine_precision,
        label: {
            show: ds_series_markLine_label_show,
            position: ds_series_markLine_label_position,
            distance: ds_series_markLine_label_distance,
        },
        lineStyle: {
            color: ds_series_markLine_lineStyle_color,
            width: ds_series_markLine_lineStyle_width,
            type: ds_series_markLine_lineStyle_type,
        },
    }
}

let oneData = result[i][measureItems[j].FIELD_NAME];
oneData = $DS.echart.formatterData(measureItems[j],oneData);
seriesData_[j].push(oneData);