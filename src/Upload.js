import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from 'react';
import "./Upload.css"
import axios from "axios";



function Upload() {

    const [name, setName] = useState("");
    const [auth, setAuth] = useState("");
    const [image, setImage] = useState("");
    const [disp, setDisp] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadMessage, setUploadMessage] = useState(null);

    // oneDriveAPI.items
    //     .listChildren({
    //         accessToken: accessToken,
    //         itemId: "root",
    //         drive: "me", // 'me' | 'user' | 'drive' | 'group' | 'site'
    //         driveId: "", // BLANK | {user_id} | {drive_id} | {group_id} | {sharepoint_site_id}
    //     })
    //     .then((childrens) => {
    //         // list all children of given root directory
    //         //
    //         console.log(childrens);
    //         // returns body of https://dev.onedrive.com/items/list.htm#response
    //     });

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setUploadMessage('Please select a file to upload.');
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch('/me/drive/root:/' + selectedFile.name + ':/content', {
                method: 'PUT',
                headers: {
                    'Content-Type': selectedFile.type,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed with status: ' + response.status);
            }

            setUploadMessage('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadMessage('An error occurred during upload.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Uploading...' : 'Upload to OneDrive'}
            </button>
            {uploadMessage && <p>{uploadMessage}</p>}
        </form>
    );

    // uploadTask.on(
    //     "state_changed",
    //     (snapshot) => {
    //         const percent = Math.round(
    //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //         );
    //         setPercent(percent);
    //     },
    //     (err) => console.log(err),
    //     () => {
    //         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //             console.log(url);

    //             axios.post("https://localhost:3001/songData", {
    //                 name: name,
    //                 auth: auth,
    //                 image: image,
    //                 accessToken: url
    //             })
    //         });
    //     }
    // );

    // return (
    //     <div className="Upload" style={{ padding: disp ? "20px" : "0" }}>
    //         <div className="visible" >
    //             <button onClick={e => { setDisp(!disp) }}>{disp ? "Collapse" : "Upload Song"}</button>
    //         </div>

    //         <div className="expanded" style={{ display: disp ? "" : "none" }}>
    //             <h1>Upload A Song</h1>
    //             <input type="text" onChange={(e) => { setName(e.target.value) }} placeholder="Name of the song" /><br />
    //             <input type="text" onChange={(e) => { setAuth(e.target.value) }} placeholder="Artist" /><br />
    //             <input type="text" onChange={(e) => { setImage(e.target.value) }} placeholder="Link to Song Art" /><br />

    //             <input type="file" style={{
    //                 backgroundColor: "transparent",
    //                 color: "#fff",
    //                 cursor: "pointer",
    //                 borderRadius: "5px"
    //             }} />

    //             <button type="submit" style={{ margin: "10px" }}>Upload to Database</button>
    //         </div>

    //     </div>
    // );
};

export default Upload;
