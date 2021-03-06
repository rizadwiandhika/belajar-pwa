// Initialize db
const db = firebase.firestore();
const col = db.collection( 'foods' )

// Biar data tetap bisa ditampilkan walaupun offline
db  .enablePersistence()  
    .catch( err => {
        if ( err.code === 'unimplemented' ) {
            console.log( 'Persistence is not available' )
        }
    } )


// preparasi mendapatkan collection
// Akses collection yg dibuat.
// Medapatkan data secara REAL TIME
col.onSnapshot( snaphot => {
    // docChanges itu cek terjadinya perubahan
    snaphot.docChanges().forEach( change => {
        console.log( change.type )
        if ( change.type === 'added' ) {
            displayFoods( change.doc.data(), change.doc.id )
        }
        if ( change.type === 'modified' ) {
            console.log( change )
            displayEditFoods( change.doc.data(), change.doc.id )
        }
        if ( change.type === 'removed' ) {
            removeFoods( change.doc.id )
        }
        
    } )
} )


/** Create  */
const addForm = document.querySelector( '.add-recipe' )
addForm.addEventListener( 'submit', e => {
    e.preventDefault() // Mencegah halaman direload
    const food = {
        title       : addForm.title.value,
        ingredients : addForm.ingredients.value
    }
    // kirim data ke database
    col .add( food )
        .then( docRef => M.toast( {html: `Makanan ${food.title} Berhasil ditambahkan`} ) )
        .catch( err => M.toast( {html: `Terdapat kesalahan :(`} ) )
    // 
    addForm.reset()
} )

/** Update */
const editForm = document.querySelector('.edit-recipe')
editForm.addEventListener( 'submit', e => {
    e.preventDefault() // mencegah halaman direload
    const id    = editForm.food_id.value

    console.log( editForm.food_id.value )
    console.log( editForm.title.value )
    console.log( editForm.ingredients.value )

    const food  = {
        title       : editForm.title.value,
        ingredients : editForm.ingredients.value
    }

    col .doc( id ).set( food )
        .then( docRef => M.toast( {html: `Makanan ${food.title} Berhasil diupdate`} ) )
        .catch( err => M.toast( {html: `Terdapat kesalahan Edit :(`} ) )
    // 
    editForm.reset()

} )

/** Delete */
// Ini ada di event binding bagian: else if ( evt.target.innerHTML === 'delete_outline' )
// Yang dilaukan cuma tangkap id dari elemen lalu col.doc( id ).delete()


/** Event Binding */
const recipeContainer = document.querySelector( '.recipes' )
recipeContainer.addEventListener( 'click', evt => {
    if ( evt.target.innerHTML === 'create' ) {
        const id = evt.target.getAttribute( 'data-id' )
        // console.log(id)
        col .doc( id )
            .get()
            .then( doc => {
                if ( doc.exists ) {
                    const rightForm = document.querySelector( '#right-form' )
                    const data = doc.data()

                    rightForm.querySelector( '#food_id' ).value = id

                    rightForm.querySelector( '#title' ).value = data.title

                    rightForm.querySelector( '#ingredients' ).value = data.ingredients


                    const instance = M.Sidenav.getInstance( rightForm )
                    instance.open()
                }
            } )
            .catch()

    } else if ( evt.target.innerHTML === 'delete_outline'
            && confirm( 'Yakin ingin menghapus data ?' ) ) {
        const id = evt.target.getAttribute( 'data-id' )
        col.doc( id ).delete()
    }
} )