import GoogleFit, {Scopes} from "react-native-google-fit";

const authorize = () => {
    const options = {
        scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_ACTIVITY_WRITE,
            Scopes.FITNESS_BODY_READ,
            Scopes.FITNESS_BODY_WRITE,
        ],
    };

    GoogleFit.authorize(options)
    .then(authResult => {
        //console.log(authResult);
        if(authResult.success) return true;
        else return authResult.message;
    })
    .catch(error => error );//console.log(error));
}


const getSteps = (startTime) => {
    var result = {
        error: false,
        data: null,
        message: '',
    };

    const options = {
        startDate: new Date(startTime).toISOString(),
        endDate: new Date(Date.now()).toISOString(),
    };

    GoogleFit.getDailyStepCountSamples(options)
    .then(res => {
        //console.log("Todo ok");
        result.data = res;
        //console.log(result);
        return result;
    })
    .catch(err => {
        //console.log("Hubo error");
        result.error = true;
        result.message = err;
        //console.log(result);
        return result;
    });
    
}

export default {
    authorize,
    getSteps,
}