import { sequelize, aron, owner, phone, utp } from "./databaser";

export default async function SampleData() {
    await sequelize.sync({ force: true })

    const aron1 = await aron.create({ location: 'תואר', name: '', utpNum: 30 })
    const aron2 = await aron.create({ location: 'הסרטה', name: 'S', utpNum: 30, shirshurFromId: 1 })
    const aron3 = await aron.create({ location: 'מרפאה', name: '', utpNum: 50 })
   

    const owner1 = owner.create({ name: "פלוני אלמוני", location: "ירושלים" })
    const phone1 = phone.create({ lineNumber: '3434' })
    const phone2 = phone.create({ lineNumber: '6969', OwnerId: 1 })
    const utp23 = utp.create({ PhoneId: 2, AronId: 2, utp: 15 })
}