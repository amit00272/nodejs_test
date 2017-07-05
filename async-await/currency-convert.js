/**
 * Created by noargs on 05/07/17.
 */
const axios=require('axios');

/*const getExchangeRate=async (from,to)=>{


    return axios.get(`http://api.fixer.io/latest?base=${from}`)
        .then((response)=>{

                return response.data.rates[to];

        });

}

const getCountries = (currencyCode)=>{

    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
        .then((response)=>{

            return response.data.map((country)=>country.name);

        });


};

const convertCurrency = (from,to,amount)=>{

    let countries;
  return getCountries(to).then((tempcountries)=>{

      countries=tempcountries;
      return getExchangeRate(from,to);

  }).then((rate)=>{

      const exchangeAmount=amount*rate;
      return `${amount} ${from} is worth ${exchangeAmount} ${to} \n${to} can be used in following countries ${countries}`;


  });

};*/


const getExchangeRate=async (from,to)=>{

    try {
        let response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
        let rate =  response.data.rates[to];

        if(rate)return rate;
                throw new Error();

    }catch(e){

        throw new Error(`Unable to get Exchange rate for ${from} and ${to}`)
    }

}

const getCountries = async (currencyCode)=>{

    try {
        let response = await  axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    }catch(e){

        throw new Error(`Unable to get Countries that use ${currencyCode}`)
    }
};



const convertCurrencyAlt = async (from,to,amount) =>{

    let countries = await  getCountries(to);
    let rate=await getExchangeRate(from,to);
    return `${amount} ${from} is worth ${amount*rate} ${to} \n${to} can be used in following countries ${countries}`;

};


convertCurrencyAlt('INR','USD',800).then((rate)=>{

   console.log(rate);

}).catch(e=>{

    console.log(e);

});