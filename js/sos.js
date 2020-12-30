let store = {}
store['DELHI'] = '01123379181'
store['ANDHRA PRADESH'] = '08632329090'
store['ARUNACHAL PRADESH'] = '03602214567'
store['ASSAM'] = '03612521242'
store['BIHAR'] = '06122320047'
store['CHANDIGARH'] = '01722741900'
store['CHATTISHGARH'] = '07712429977'
store['GOA'] = '08322421080'
store['GUJRAT'] = '07923251604'
store['HARYANA'] = '9911599100'
store['HIMACHAL PRADESH'] = '9816077100'
store['MAHARASHTRA'] = '02226111103'
store['PUNJAB'] = '1091'
store['TAMIL NADU'] = '04428592750'
store['TRIPURA'] = '03812323355'
store['RAJASTHAN'] = '18001200020'
store['KARNATAKA'] = '08212418400'
store['MADHYA PRADESH'] = '07552661813'
store['KERALA'] = '9995399953'
store['UTTAR PRADESH'] = '1090'
store['WEST BENGAL'] = '03323595609'
store['ANDAMAN & NICOBAR'] = '181'
store['DAMAN AND DIU'] = '112'
store['JHARKHAND'] = '9771432103'
store['JAMMU AND KASHMIR'] = '1091'
store['LADAKH'] = '112'
store['LAKSHDWEEP'] = '1091'
store['MANIPUR'] = '181'
store['UTTARAKHAND'] = '1090'
store['TELANGANA'] = '181'
store['SIKKIM'] = '112'
store['PONDICHERRY'] = '1091'
store['ODISHA'] = '1091'
store['NAGALAND'] = '181'
store['MIZORAM'] = '181'
store['MEGHALAYA'] = '112'



function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      
    }
  }

  function showPosition(position) {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=5db5a96f174d46e389853c0ec12d44a2`)
      .then(res => res.json())
      .then(res => {
        if(res.results[0].components.state){
           
  document.getElementById('sos').innerHTML = `<a href=tel:${store[res.results[0].components.state.toUpperCase()]}><img src="./images/sos.png" style="z-index: 100; height: 70px; width: 70px; border-radius: 50%; position: fixed; bottom: 25px; right: 25px;  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"></a>`
        } else {
          // nothing is possible, sorry :(
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There was some error, contact pragatiathome@gmail.com.",
        })
      });
  }

  getLocation()
