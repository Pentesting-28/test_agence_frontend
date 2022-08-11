import moment from 'moment';
import 'moment/locale/es';
import Swal from 'sweetalert2';

export const organizeByConsultants = (arrayObjectcs, itemsSelect) => {
    if(!Array.isArray(arrayObjectcs)){
        return null;
    }
    return arrayObjectcs.reduce(function (acumulador, valorActual)
        {
          const name = itemsSelect.find((consultant) => { 
            return consultant.co_usuario === valorActual.co_usuario;
          });

          let valorActualAssignName = Object.assign({name:name.no_usuario}, valorActual);

          acumulador[valorActual.co_usuario] = acumulador[valorActualAssignName.co_usuario] || [];
          acumulador[valorActual.co_usuario].push(valorActualAssignName);

          return acumulador;
          
        }, {});
}

export const calculationsOfAmounts = (arrayObjectcs, key, type = true) => {
    if(!Array.isArray(arrayObjectcs) || key === null){
        return null;
    }
    let total = arrayObjectcs.reduce((previousValue, currentValue, i) => {
        if(type){
            return previousValue + currentValue[key];
        }
        else{
            if( i != 0 ){ 
                previousValue -= currentValue[key];
            }else{
                previousValue = currentValue[key];
            }
            return previousValue;
        }
    }, 0);
    return total;
}

export const formatAmounts = (amount) => {
    if(amount === null){
        return null;
    }
    const parseAmount = parseFloat(amount);
    return new Intl.NumberFormat('de-DE').format(parseAmount.toFixed(2));
}

export const formatMonth = (amount) => {
    if(amount === null){
        return null;
    }
    return moment(amount).format('MMMM')
}

export const alertDinamic = ( type, title, text) => {
    if( type === null || title === null || text === null){
        return null;
    }
    Swal.fire({
        icon: type,
        title: title,
        text: text,
        timer: 3500
    });
}

export const sortArrayItems = (arrayConsultants) => {
    if(arrayConsultants === null){
        return null;
    }
    return arrayConsultants.sort((a,b) => {
        return a.no_usuario < b.no_usuario ? -1 : + (a.no_usuario > b.no_usuario);
    });
}