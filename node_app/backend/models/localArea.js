/**
 * Created by DFAULUS on 8/19/2014.
 */

module.exports = function(sequelize, DataTypes) {
    var LocalArea = sequelize.define('LocalArea', {
                id: DataTypes.INTEGER,
                local_area_name: DataTypes.STRING
            },
            {
                tableName: 'local_area',
                timestamps: false,
                getterMethods: {
                    anotherName: function() {
                        return this.getDataValue('local_area_name');
                    }
                }
            });
    return LocalArea;
};
