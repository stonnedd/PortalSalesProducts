var jqgrid = {};

jqgrid.select = function (dt) {
    var objDt = dt.toObject();
    var data = { id: dt.id, cell: objDt };
    data.cell.id = dt.id;
    return data;
};

jqgrid.quote = function (str) {
    return str.replace(/(?=[\/\\^$*+?.()|{}[\]])/g, "\\");
}

jqgrid.doQuery = function (req, res, model, toSelect) {
    try {
        var query = model;
        var queryCount = model;
        
        var hasRule = false;
        
        if (req.body._search && req.body.filters) {
            var filters = JSON.parse(req.body.filters);
            var rules = filters.rules;
            for (var i = 0, len = rules.length; i < len; i++) {
                var rule = rules[i];
                query = query.where(rule.field, new RegExp("^" + jqgrid.quote(rule.data)));
                queryCount = queryCount.where(rule.field, new RegExp("^" + jqgrid.quote(rule.data)));
                hasRule = true;
            }
        }
        
        if (!hasRule) {
            query = query.find();
            queryCount = queryCount.find();
        }
        
        query.select(toSelect)
            .skip((req.body.page - 1) * req.body.rows)
            .limit(req.body.rows)
            .sort((req.body.sord === 'desc' ? '-' : '') + req.body.sidx)
            .exec(function (err, collection) {
            if (err) {
                res.json({ error: true });
            } else {
                queryCount.count(function (err, count) {
                    if (err) {
                        res.json({ error: true });
                    } else {
                        var rows = [];
                        for (var i = 0, len = collection.length; i < len; i++) {
                            var row = collection[i];
                            rows.push(jqgrid.select(row));
                        }
                        res.json({ total: parseInt(count / req.body.rows) + (count % req.body.rows === 0 ? 0 : 1), page: req.body.page, records: count, rows: rows });
                    }
                });
            }
        });
    } catch (e) {
        res.json({ error: true });
    }
}

module.exports = jqgrid;