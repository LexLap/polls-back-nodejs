const mongoose = require("mongoose")


const pollSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			unique: true,
			required: true
		},

		options: {
			type: [Object]
		}
	}
)

pollSchema.methods.incVotes = async function (index){
    const poll = this
    poll.options[index].votes += 1
	poll.markModified('options')
    await poll.save()
}

pollSchema.pre('validate', async function () {

	const modifiedOptions = []
	if(!this.options[0].option)
		if(this.options?.length > 0){

			this.options.map( option => {
				modifiedOptions.push({
					option,
					"votes": 0
				})
			})
			this.options = modifiedOptions
		}else
			throw new Error('New poll does not include options!')
	
})


const Poll = mongoose.model("Poll", pollSchema)

module.exports = Poll