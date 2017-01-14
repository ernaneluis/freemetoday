export class DataConfig
{

  public data: any = {
    blogs:[
      {name: "Spotniks", url: "http://spotniks.com/"},
      {name: "Rothbard Brasil", url: "http://rothbardbrasil.com/"},
      {name: "Imposto É ROUBO!", url: "http://impostoeroubo.com.br/"},
      {name: "SFL Brasil", url: "http://studentsforliberty.org/brasil/"},
      {name: "MBL", url: "http://mbl.org.br/"},
      {name: "Ideal Libertario", url: "https://ideallibertario.wordpress.com/"},
      {name: "Foda-se o Estado", url: "http://foda-seoestado.com/"},
      {name: "Anarco Capitalismo", url: "https://anarcocapitalismo.com.br/"},
      {name: "Instituto Millenium", url: "http://www.institutomillenium.org.br/"},
      {name: "Instituto Liberal", url: "https://www.institutoliberal.org.br/"}
    ],
    videos:[
      {chanelName: "ideiasradicais", channelId:"UC-NwgkrLPYmzM-xoLr2GX-Q", playlistId: "UU-NwgkrLPYmzM-xoLr2GX-Q"},
      {chanelName: "Stone Garou", channelId:"UCnL00qrAdEH4yosYTbgNVlw", playlistId: "PL3axa6PBO2VoIHr3eAH1PWlA8CiYia80i"},
      {chanelName: "Estudantes Pela Liberdade", channelId:"UCWU5PdQ9Ec5eZleRm6Qd-Ig", playlistId: "UUWU5PdQ9Ec5eZleRm6Qd-Ig"},
      {chanelName: "Anti Estado", channelId:"UC6IJgpDhXg0JoULOXw74BKg", playlistId: "UU6IJgpDhXg0JoULOXw74BKg"},
      {chanelName: "O Agorista", channelId:"UCY0v0I-00pjwdN5bzOtZLkA", playlistId: "UUY0v0I-00pjwdN5bzOtZLkA"},
      {chanelName: "Alexandre Porto", channelId:"UC7HSHXNT9PO8TLDG9Fi3HKQ", playlistId: "UU7HSHXNT9PO8TLDG9Fi3HKQ"},
      {chanelName: "O Libertário", channelId:"UCppPqSzIPkMsJe7uoD5ZL_A", playlistId: "UUppPqSzIPkMsJe7uoD5ZL_A"},
      {chanelName: "Mr. Libertário", channelId:"UCmmF6n4zgfyCJBnAlkY0dwQ", playlistId: "UUmmF6n4zgfyCJBnAlkY0dwQ"},
      {chanelName: "Devaneios Políticos", channelId:"UCrjwYZtGT0Gacy2VVKy4yIQ", playlistId: "UUrjwYZtGT0Gacy2VVKy4yIQ"},
      {chanelName: "ANCAP.SU", channelId:"UCSyG9ph5BJSmPRyzc_eGC4g", playlistId: "UUSyG9ph5BJSmPRyzc_eGC4g"},
      {chanelName: "foda-se o estado", channelId:"UCRZ_8Y6YFg5ikzma8-0BPaw", playlistId: "UURZ_8Y6YFg5ikzma8-0BPaw"},
      {chanelName: "Mamaefalei", channelId:"UCkSjy-IOEq-eMtarZl2uH1Q", playlistId: "UUkSjy-IOEq-eMtarZl2uH1Q"},
      {chanelName: "Tradutores de Direita", channelId:"UCJqOdpqndf1MPequlvDgGkA", playlistId: "UUJqOdpqndf1MPequlvDgGkA"},
      {chanelName: "Debate Ancap", channelId:"UCLOUrG-aGY0SbvYO5Q3oX1w", playlistId: "UULOUrG-aGY0SbvYO5Q3oX1w"},
      {chanelName: "RothGirl", channelId:"UCbON19PsKqlrYHSr2qjxHcQ", playlistId: "UUbON19PsKqlrYHSr2qjxHcQ"},
      {chanelName: "Mises Youtube", channelId:"UCb9T91q727Ld4c3lqq3w6Xw", playlistId: "UUb9T91q727Ld4c3lqq3w6Xw"},
      {chanelName: "Instituto Rothbard", channelId:"UC68m7m_BSw1q4wOZdBgZdlQ", playlistId: "UU68m7m_BSw1q4wOZdBgZdlQ"},
      {chanelName: "Dâniel Fraga", channelId:"UC-nr9CZ9LglgqMOqSSlzytg", playlistId: "UU-nr9CZ9LglgqMOqSSlzytg"},
      {chanelName: "Paulo Kogos", channelId:"UCmArkwjUI8VRHudOjEsVCUw", playlistId: "UUmArkwjUI8VRHudOjEsVCUw"},
      {chanelName: "Roberto Pantoja", channelId:"UCyKB1d2IMYYqsjPQipCU8aA", playlistId: "UUyKB1d2IMYYqsjPQipCU8aA"},
      {chanelName: "LIBERNERD", channelId:"UC5GIfQSOs1NgSBzXXyXL-rQ", playlistId: "UU5GIfQSOs1NgSBzXXyXL-rQ"},
      {chanelName: "Foro de Viena", channelId:"UC7oG0Va4QrHtrbUgZsg7q2A", playlistId: "UU7oG0Va4QrHtrbUgZsg7q2A"}
    ]
  };

  constructor()
  {

    // this.data

  }//end constructor

  getFeeds()
  {
      console.log("data config")
      let array = this.data.blogs;
      return array.sort(this.dynamicSort("name"));
  }

  getVideos()
  {
      let array = this.data.videos;
      return array.sort(this.dynamicSort("chanelName"));
  }



  dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }

}//end class


// ,
// articles:[],
// videos:[],
// podcasts:[]

/*

YOUTUBE
GET playlist id from uploaded videos
GET https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id={CHANEL_ID}&maxResults=50&key={YOUR_API_KEY}
GET https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername={CHANEL_NAME}&maxResults=50&key={YOUR_API_KEY}

GET PLAYLIST ITEMS from uploaded videos playlist ID
https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=10&playlistId={PLAYLIST_ID}&key={YOUR_API_KEY}


*/
