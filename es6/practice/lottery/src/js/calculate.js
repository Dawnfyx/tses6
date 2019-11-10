class Calculate{

    /**
     * [computeCount 计算注数]
     * @param  {number} active    [当前选中的号码]
     * @param  {string} play_name [当前的玩法标识]
     * @return {number}           [注数]
     */
    computeCount(active, play_name){
        let count = 0;
        const exist = this.play_list.has(paly_name);
        const arr = new Array(active).fill("0")
        if(exist && play_name.at(0) === "r"){
            count = Calculate.combine(arr, play_name.split('')[1].length)
        }
        return  count
    }

    computeBonus(active, play_name){
        const play = play_name.split('')
        const self = this
        let arr = new Array( play[1] * 1).fill( 0)
        let min, max
        if(play[0] === 'r'){
            let min_active = 5 - (11 -active)

        }
    }

}
export default Calculate
