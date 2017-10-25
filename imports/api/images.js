let imageStore = new FS.Store.GridFS("images", {
    transformWrite: function(fileObj, readStream, writeStream) {
        // Transform the image into a 100x100px thumbnail
        gm(readStream, fileObj.name()).resize('100', '100').stream().pipe(writeStream);
    }
})

export const Images = new FS.Collection("images",{
    stores: [imageStore],
    filter: {
        allow: {
            contentTypes: ['image/*'] //allow only images in this FS.Collection
        }
    }
})

if (Meteor.isServer) {
    // This code only runs on the server
    Images.allow({
        'insert': function () {
            // add custom authentication code here
            return true;
        },
        'update': function () {
            // add custom authentication code here
            return true;
        },
        'download': function () {
            // add custom authentication code here
            return true;
        },
        'remove': function () {
            // add custom authentication code here
            return true;
        }
    });
    
    Meteor.publish('images', function () {
        return Images.find();
    });
}
