import {
    createTuit,
    deleteTuit,
    findTuitById,
    findAllTuits,
    findTuitByUser
} from "../services/tuits-service";
import {
    createUser,
    deleteUsersByUsername
} from "../services/users-service";

describe('can create tuit with REST API', () => {
    const ripley = {
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com'
    };

    const sampleTuit = {
        tuit: 'Ellen Ripley sample tuit'
    };

    let sampleUser;

    beforeAll(async () => {
        sampleUser = await createUser(ripley);
        console.log(sampleUser)
    })

    afterAll(async () => {
        const tuits = await findTuitByUser(sampleUser.id);
        for (let each of tuits) {
            await deleteTuit(each._id)
        }

        await deleteUsersByUsername(sampleUser.username)
    })

    test('create tuit', async () => {
        const newTuit = await createTuit(sampleUser.id, sampleTuit);

        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
        expect(newTuit.postedBy).toEqual(sampleUser.id);
    })
});

describe('can delete tuit with REST API', () => {
    const sowell = {
        username: 'thommas_sowell',
        password: 'compromise',
        email: 'compromise@solutions.com'
    };

    const sampleTuit = {
        tuit: 'Thommas Sowell sample tuit'
    }

    let sampleUser;

    beforeAll(async () => {
        sampleUser = await createUser(sowell);
    });

    afterAll(() => {
        return deleteUsersByUsername(sowell.username);
    })

    test('delete tuit', async () => {
        const newTuit = await createTuit(sampleUser.id, sampleTuit);
        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
        expect(newTuit.postedBy).toEqual(sampleUser.id);
        const status = await deleteTuit(newTuit._id);
        expect(status.deletedCount).toEqual(1);
    })
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    const adam = {
        username: 'adam_smith',
        password: 'not0sum',
        email: 'wealth@nations.com'
    };

    const sampleTuit = {
        tuit: 'Adam Smith sample tuit'
    };

    let sampleUser;
    let newTuit;

    beforeAll(async () => {
        sampleUser = await createUser(adam);
    });

    afterAll(async () => {
        await deleteUsersByUsername(sampleUser.username);
        await deleteTuit(newTuit._id);
    });

    test('findTuitById', async () => {
        newTuit = await createTuit(sampleUser.id, sampleTuit);

        expect(newTuit.tuit).toEqual(sampleTuit.tuit);
        expect(newTuit.postedBy).toEqual(sampleUser.id);

        const existingTuit = await findTuitById(newTuit._id);

        expect(existingTuit.tuit).toEqual(newTuit.tuit);
        expect(existingTuit.postedBy._id).toEqual(newTuit.postedBy);
        expect(existingTuit.postedBy.username).toEqual(sampleUser.username);
    })
});

describe('can retrieve all tuits with REST API', () => {
    const larry = {
        username: 'larry',
        password: 'larry123',
        email: 'larry@gmail.com'
    };

    const tuits = [
        'test tuit 1', 'test tuit 2', 'test tuit 3'
    ];

    let sampleUser;
    let createdTuits = [];

    beforeAll(async () => {
        sampleUser = await createUser(larry);

        for (let tuit of tuits) {
            createdTuits.push(await createTuit(sampleUser.id, {tuit}));
        };
    });

    afterAll(async () => {
        // delete tuits
        for (let tuit of createdTuits) {
            await deleteTuit(tuit._id);
        };

        await deleteUsersByUsername(sampleUser.username);
    });

    test('findAllTuits', async () => {
        const allTuits = await findAllTuits();
        expect(allTuits.length).toBeGreaterThanOrEqual(tuits.length);

        const tuitsWeInserted = allTuits.filter(
            tuit => tuits.indexOf(tuit.tuit) >= 0
        );

        tuitsWeInserted.forEach(tuit => {
            const tuitBody = tuits.find(eachTuit => eachTuit === tuit.tuit);
            expect(tuit.tuit).toEqual(tuitBody);
            expect(tuit.postedBy._id).toEqual(sampleUser.id);
            expect(tuit.postedBy.username).toEqual(sampleUser.username);
        });
    });
});