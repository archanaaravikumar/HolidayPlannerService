function middleware() {

    const APPLICATION_ID = 'amzn1.ask.skill.4c7c3d21-7cf6-44bc-a4df-09e28881d63e'

    function checkValidRequestMiddleware(request, response, next) {

        if (request.body.session.application.applicationId !== APPLICATION_ID)
        {
            return response.status(400).send('Invalid Request');
        }

        next();
    }
    return checkValidRequestMiddleware;
}

module.exports = middleware;