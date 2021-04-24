// const mongoose = require('mongoose');

// module.exports = mongoose => {
//     const schema = mongoose.Schema(
        // {
        //     name: {
        //         type: String,
        //         required: [true, 'Please provide a name'],
        //     },
        //     description: {
        //         type: String,
        //         required: [true, 'Please provide a description'],
        //         index: true
        //     },
        //     dataPoints: {
        //         type: Array,
        //         required: [true, 'Please provde the data points']
        //     }
        // },
        // {timestamps: true}
//     );
  
//     schema.method("toJSON", function() {
//       const { __v, _id, ...object } = this.toObject();
//       object.id = _id;
//       return object;
//     });
  
//     const Tab = mongoose.model("tab", schema);
//     return Tab;
//   };

const mongoose = require('mongoose');

const TabSchema = mongoose.Schema( {
    name: {
        type: String,
        // required: [true, 'Please provide a name'],
        required: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        index: true
    },
    dataPoints: {
        type: Array,
        required: [true, 'Please provde the data points']
    }
},
{timestamps: true}
);

module.exports = mongoose.model('Tab', TabSchema);
