export const attachFileUploadHeadersInterceptor = ({ url, options }) => {
    const { body } = options;
    const { filePath } = JSON.parse(body);
    if (filePath && body) {
        options.headers.set('Dropbox-API-Arg', JSON.stringify({
            'path': filePath,
            'mode': 'overwrite',
            'autorename': true,
            'mute': false,
            'strict_conflict': false,
        }));
    }
    return Promise.resolve([url, options]);
};
