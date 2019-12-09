import axios from 'axios';
export const getRootLevelDocs = async() =>{
    return await axios.get(process.env.REACT_APP_SERVER+'/api');
}
export const getDocumentMetadataById = async(id) => {
    let url = process.env.REACT_APP_SERVER + '/api/document/metadata/' + id;
    return await  axios.get(url);
}
export const getDocumenById = async(id) => {
    let url = process.env.REACT_APP_SERVER + '/api/document/' + id;
    const res = await axios.get(url);
    return res
}
export const saveOrUpdateDocument = async(currentDoc, data) => {
    let url = process.env.REACT_APP_SERVER +'/api/document/' + currentDoc._id
    return await axios.put(url, { data: data });
}
export const deleteDocummentOrFolder = async(data) => {
    let url = process.env.REACT_APP_SERVER + '/api/document/' + data.currentDoc._id;
    return await axios.delete(url);
    
}