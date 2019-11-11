import { postViews } from '../views/screenPostView.js'


/*aquí guardamos los post en firebase*/
export const takePostValue = (valuePost, counter) => {
    var db = firebase.firestore();
    db.collection("Post").add({
        user: firebase.auth().currentUser.displayName,
        post: valuePost,
        date: new Date(),
        uId: firebase.auth().currentUser.uid,
        likes: counter

    })
        .then(function (docRef) {
            console.log("Document successfully written!", docRef.id);

            document.getElementById("inputPost").value = ""
            recoverPost()
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}


// aquí se toma los post publicados por los usuarios para poder imprimirlos
export const recoverPost = () => {
    var db = firebase.firestore();
    var postRef = db.collection("Post")
    postRef
        .where("uId", "==", firebase.auth().currentUser.uid)
        .get()
        .then(function (querySnapshot) {
            const postMap = querySnapshot.docs.map(function (doc) {
                console.log(doc.data().date);
                return {
                    id: doc.id,
                    ...doc.data()
                };

            });
            postMap.sort((a, b) => b.date.seconds - a.date.seconds);
            postViews(postMap.shift());
        })
        .catch(function (error) {
            // console.log("Error getting documents: ", error);
        });
}


//editando post
export const editPost = (id) => {
    let db = firebase.firestore();
    //se obtiene el post
    db.collection("Post").doc(id).get().then(doc => {
        //se obtiene la valor de texto del post
        document.getElementById(`inputPost`).value = doc.data().message;
        //mostramos input textarea para poder cambiar texto
        document.getElementById(`inputPost`).style.display = "block";
        //ocultamos el <p> para que no se vea mientras se hace la edición
        document.getElementById(`msg${doc.post}`).style.display = "none";
        //se oculta botón editar
        document.getElementById(`edit`).style.display = "none";
        //se muestra boton guardar
        document.getElementById(`save${doc.post}`).style.display = "inline";
        //se da acción a boton guardar
        document.getElementById('save' + doc.post).addEventListener('click', () => {
            //se guarda el nuevo valor del post que esta en el input
            let post = document.getElementById(`inp${doc.post}`).value;
            //update del post en la base de datos
            let docRef = db.collection("Post").doc(id);
            return docRef.update({
                message: post
            })
                .then(() => {
                    //se devuelven las vistas a post publicado
                    document.getElementById(`msg${doc.post}`).style.display = "block";
                    document.getElementById(`inp${doc.post}`).style.display = "none";
                    document.getElementById(`save${doc.post}`).style.display = "none";
                    document.getElementById(`edit${doc.post}`).style.display = "inline";
                    console.log("Documento actualizado")
                })
                .catch((error) => {
                    console.error(error);
                })
        })
    })
}



/* borrar post */

export const deletePost = (id) => {
    var db = firebase.firestore();
    db.collection("Post").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

