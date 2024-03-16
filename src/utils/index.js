function getLeaveCount(item) {
    return parseInt(item.storage_count) - parseInt(item.out_count);
}

function setLeaveCount(arr) {
    return arr.map(item=>{
        item.leave_count = getLeaveCount(item)
        return item
    })
}

module.exports = {
    getLeaveCount,
    setLeaveCount
}