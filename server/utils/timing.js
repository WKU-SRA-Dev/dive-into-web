const intervalTimer = (callback, delay) => {
    function executeCallback(...args) {
        try {
            callback(...args);
        } catch (error) {
            console.error('Error in callback:', error);
            return; 
        }
        setTimeout(()=>executeCallback(...args), delay);
    }

   return (...args) => setTimeout(()=>executeCallback(...args), delay);
};

module.exports = { intervalTimer };
