let xlsx = require("json-as-xlsx")
const attributeMap = require('./attributeMap')

function mockData() {
    return (
        [{
            customer_id: 'X18',
            come_time: '2022/1/10 ',
            product_name: '黑车灯',
            product_sku: '黑车灯',
            storage_count: '179',
            save_days: 395,
            out_count: '0',
            status: '待出库',
            product_code: '9545',
            out_time: '1969-12-31T16:00:00.000Z',
            record_code: '',
            company_name: '小十八电子商务有限公司',
            leave_count: 179
        },]
    )
}

function formateData(data, sheet = '清单') {
    const columns = []
    const content = []
    const attributeLength = Object.keys(data[0]).length
    let isFilled = false

    data.forEach((item) => {
        if (columns.length === attributeLength) {
            isFilled = true
        }

        let obj = {}
        for (let key in item) {
            (key == 'out_time' || key == 'come_time') && (item[key] = item[key].slice(0, 10))
            obj[key] = item[key]

            if (!isFilled) {
                columns.push({ label: attributeMap[key], value: key })
            }
        }
        content.push(obj)
    })

    return [
        {
            sheet,
            columns,
            content
        }
    ]
}
let data = [
    {
        sheet: "Adults",
        columns: [
            { label: "User", value: "user" }, // Top level data
            { label: "Age", value: (row) => row.age + " years" }, // Custom format
            { label: "Phone", value: (row) => (row.more ? row.more.phone || "" : "") }, // Run functions
        ],
        content: [
            { user: "Andrea", age: 20, more: { phone: "11111111" } },
            { user: "Luis", age: 21, more: { phone: "12345678" } },
        ],
    },
    {
        sheet: "Children",
        columns: [
            { label: "User", value: "user" }, // Top level data
            { label: "Age", value: "age", format: '# "years"' }, // Column format
            { label: "Phone", value: "more.phone", format: "(###) ###-####" }, // Deep props and column format
        ],
        content: [
            { user: "Manuel", age: 16, more: { phone: 9999999900 } },
            { user: "Ana", age: 17, more: { phone: 8765432135 } },
        ],
    },
]

const date = new Date()
const month = date.getMonth() + 1
const years = date.getFullYear()
const defaultSetting = {
    fileName: `${years}年${month}月清单`, // Name of the resulting spreadsheet
    extraLength: 4, // A bigger number means that columns will be wider
    writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
    RTL: true, // Display the columns from right-to-left (the default value is false)
}
function json2Excel(data, sheet, setting = {}) {
    if (!data || data.length === 0) return

    if (JSON.stringify(setting) === "{}") {
        setting = defaultSetting
    }
    Object.assign(defaultSetting, setting)


    data = formateData(data, sheet)
    xlsx(data, setting) // Will download the excel file
}

// ----- test ----- 
// xlsx(data, settings) // Will download the excel file

// export default json2Excel
module.exports = json2Excel


