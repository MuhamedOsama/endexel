const Tag = require("./tag.model")

const createTag = async(tag) =>{

    const newTag = Tag.create(tag)
    if (newTag) {
        return await newTag
    }else{
        return await newTag.erros
    }

}

const updateTag = async(id , tag)=>{
    return await Tag.findByIdAndUpdate({_id: id }, tag, {new: true})
}


const getTag = async(id)=> {
    return await Tag.findById(id)
}
const getTagByName = async(name) => {
    return await Tag.findOne({name: name})
}

const getAllTags = async()=>{
    return await Tag.find()
}
const getAllTagsByNames = async (names) => {
    return await Tag.find({ 'name': { $in: names } });
}

const deleteTag = async(id)=>{
    return await Tag.findByIdAndDelete(id).exec()
}

const addCourseToTag = async (tagId, courseId) => {
    let tag = await Tag.findById(tagId)
    if(tag.courses.includes(courseId)){
        return tag
    }else{
        await tag.update({courses: [...tag.courses,courseId]})
        return tag
    }
  }

module.exports = {
    createTag,
    getTag,
    getTagByName,
    getAllTags,
    updateTag,
    deleteTag,
    addCourseToTag,
    getAllTagsByNames
}