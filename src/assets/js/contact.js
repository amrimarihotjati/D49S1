

function submitData(){
    let name = document.getElementById("input-name").value
    let email = document.getElementById("input-email").value
    let phoneNumber = document.getElementById("input-phone").value
    let subject = document.getElementById("input-subject").value
    let message = document.getElementById("input-message").value
    
    if(name == ""||email == ""||phoneNumber == ""||subject == ""||message == ""){
        return Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Harap lengkapi semua form!',
            confirmButtonColor: '#930e2d',
            iconColor: '#930e2d'
        })
    }

    let emailReceiver = "amrimarihotjati@gmail.com"

    let a = document.createElement('a')
    a.href = `mailto:${emailReceiver}?subject=${subject}&body=Halo nama saya ${name},\n${message}, silahkan kontak saya di nomor berikut : ${phoneNumber}`
    a.click()
}
