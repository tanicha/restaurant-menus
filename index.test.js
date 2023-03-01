const {sequelize} = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        // TODO - write test
        const pizzaRestaurant = await Restaurant.create({name: 'Pizzeria', location: 'SoCal', cuisine: 'Fast Food', rating: 5})

        expect(pizzaRestaurant.name).toEqual('Pizzeria')
        expect(pizzaRestaurant.location).toEqual('SoCal')
        expect(pizzaRestaurant.cuisine).toEqual('Fast Food')
        expect(pizzaRestaurant.rating).toEqual(5)
    });

    test('can create a Menu', async () => {
        const createdMenu = await Menu.create({title: 'Breakfast'})

        expect(createdMenu.title).toEqual('Breakfast')
    });

    test('can find Restaurants', async () => {
        // TODO - write test
        // obj 1
        expect(seedRestaurant[0].name).toEqual('AppleBees')
        expect(seedRestaurant[0].location).toEqual('Texas')
        expect(seedRestaurant[0].cuisine).toEqual('FastFood')

        // obj 2
        expect(seedRestaurant[1].name).toEqual('LittleSheep')
        expect(seedRestaurant[1].location).toEqual('Dallas')
        expect(seedRestaurant[1].cuisine).toEqual('Hotpot')

        // obj 3
        expect(seedRestaurant[2].name).toEqual('Spice Grill')
        expect(seedRestaurant[2].location).toEqual('Houston')
        expect(seedRestaurant[2].cuisine).toEqual('Indian')
    });

    test('can find Menus', async () => {
        // TODO - write test
        //obj 1
        expect(seedMenu[0].title).toEqual('Breakfast')
        //obj 2
        expect(seedMenu[1].title).toEqual('Lunch')
        //obj 3
        expect(seedMenu[2].title).toEqual('Dinner')
    });

    test('can delete Restaurants', async () => {
        const sorryRestaurant = await Restaurant.create({name: 'BadPizzaJoint', location: 'Pluto', cuisine: 'Fast Food'})
        const deletedRestaurant = await sorryRestaurant.destroy()

        expect(deletedRestaurant).toEqual(sorryRestaurant)
    });

    test('can delete Restaurants (testing another way)', async () => {
        const sorryRestaurant = await Restaurant.create({name: 'BadPizzaJoint', location: 'Pluto', cuisine: 'Fast Food'})

        await sorryRestaurant.destroy()

        const foundRestaurant = await Restaurant.findAll({
            where: {
                name: 'BadPizzaJoint'
            }
        })

        expect(foundRestaurant).toEqual([])
    });

    //extra test for update()
    test('updating restaurant instances', async () => {
        const pizzaRestaurant2 = await Restaurant.create({name: 'Pizzeria', location: 'Las Vegas', cuisine: 'Fast Food', rating: 5})

        await pizzaRestaurant2.update({rating: 10})
        await pizzaRestaurant2.update({location: 'New Hampshire'})
        await pizzaRestaurant2.update({name: 'Mom Pizza'})

        expect(pizzaRestaurant2.rating).toEqual(10)
        expect(pizzaRestaurant2.location).toEqual('New Hampshire')
        expect(pizzaRestaurant2.name).toEqual('Mom Pizza')
    })
});