class ContactApi {
    static URL = 'https://62e6b2430e5d74566aeb3d86.mockapi.io/ContactList/';

    static request(id = '', method = 'GET', body) {
        return fetch(ContactApi.URL + id, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-type': 'application/json',
            },
        })
        .catch((e) => {
            throw new Error(`ContactApi can not execure request: ${e.message}`);
        });
    }

    static getContactList() {
        return ContactApi
            .request()
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                throw new Error('Can not retrive contact list');
            });
    }

    static create(contact) {
        return ContactApi
            .request('', 'POST', contact)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
        
                throw new Error('Can not create new contact');
            });
    }

    static edit(id, changes) {
        return ContactApi
            .request(id, 'PUT', changes)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
        
                throw new Error(`Can not update contact with id "${id}"`);
            });
    }

    static delete(id) {
        return ContactApi
            .request(id, 'DELETE')
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
        
                throw new Error(`Can not delete contact with id "${id}"`);
            });
    }
}