const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

// versionCode — A positive integer [...] -> https://developer.android.com/studio/publish/versioning
const versionCodeRegexPattern = /(versionCode(?:\s|=)*)(.*)/;
// versionName — A string used as the version number shown to users [...] -> https://developer.android.com/studio/publish/versioning
const versionNameRegexPattern = /(versionName(?:\s|=)*)(.*)/;

const applicationIdRegexPattern = /(applicationId(?:\s|=)*)(.*)/;
const keystoreAliasRegexPattern = /(keyAlias(?:\s|=)*)(.*)/;
const keystorePasswordRegexPattern = /(storePassword(?:\s|=)*)(.*)/;
const keystoreAliasPasswordRegexPattern = /(keyPassword(?:\s|=)*)(.*)/;

try {
    const gradlePath = core.getInput('gradlePath');
    const versionCode = core.getInput('versionCode');
    const versionName = core.getInput('versionName');
    const applicationId = core.getInput('applicationId');
    const keystoreAlias = core.getInput('keystoreAlias');
    const keystorePassword = core.getInput('keystorePassword');
    const keystoreAliasPassword = core.getInput('keystoreAliasPassword');
    console.log(`Gradle Path : ${gradlePath}`);
    console.log(`Version Code : ${versionCode}`);
    console.log(`Version Name : ${versionName}`);
    console.log(`Application Id : ${applicationId}`);
    console.log(`Keystore Alias : ${keystoreAlias}`);
    console.log(`Keystore Password : ${keystorePassword}`);
    console.log(`Keystore Alias Password : ${keystoreAliasPassword}`);

    fs.readFile(gradlePath, 'utf8', function (err, data) {
        newGradle = data;
        if (versionCode.length > 0)
            newGradle = newGradle.replaceAll(versionCodeRegexPattern, `$1${versionCode}`);
        if (versionName.length > 0)
            newGradle = newGradle.replaceAll(versionNameRegexPattern, `$1\"${versionName}\"`);
        if (applicationId.length > 0)
            newGradle = newGradle.replaceAll(applicationIdRegexPattern, `$1\"${applicationId}\"`);
        if (keystoreAlias.length > 0)
            newGradle = newGradle.replaceAll(keystoreAliasRegexPattern, `$1\"${keystoreAlias}\"`);
        if (keystorePassword.length > 0)
            newGradle = newGradle.replaceAll(keystorePasswordRegexPattern, `$1\"${keystorePassword}\"`);
        if (keystoreAliasPassword.length > 0)
            newGradle = newGradle.replaceAll(keystoreAliasPasswordRegexPattern, `$1\"${keystoreAliasPassword}\"`);
        

        fs.writeFile(gradlePath, newGradle, function (err) {
            if (err) throw err;
            if (versionCode.length > 0)
                console.log(`Successfully override version code ${versionCode}`)
            if (versionName.length > 0)
                console.log(`Successfully override version name ${versionName}`)
            if (applicationId.length > 0)
                console.log(`Successfully override application id ${applicationId}`)
            if (keystoreAlias.length > 0)
                console.log(`Successfully override keystore alias ${keystoreAlias}`)
            if (keystorePassword.length > 0)
                console.log(`Successfully override keystore password ${keystorePassword}`)
            if (keystoreAliasPassword.length > 0)
                console.log(`Successfully override keystore alias password ${keystoreAliasPassword}`)
            core.setOutput("result", `Done`);
        });
    });

} catch (error) {
    core.setFailed(error.message);
}
