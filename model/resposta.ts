export default class RespostaModel {
    #valor: string
    #certa: boolean
    #revelada: boolean

    constructor(valor: string, certa: boolean, revelada: boolean) {
        this.#valor = valor
        this.#certa = certa
        this.#revelada = revelada
    }

    static certa(valor: string) {
        return new RespostaModel(valor, true, false)
    }

    static errada(valor: string){
        return new RespostaModel(valor, false, false)
    }

    get valor() {
        return this.#valor
    }

    get certa() {
        return this.#certa
    }

    get revelada() {
        return this.#revelada
    }

    revelar() {
        return new RespostaModel(this.#valor, this.#certa, true)
    }

    static criarUsandoObjeto(obj: { valor: string; certa: boolean; revelada: boolean }): RespostaModel {
        return new RespostaModel(obj.valor, obj.certa, obj.revelada)
    }
    
    paraObjeto() {
        return {
            valor: this.#valor,
            certa: this.#certa,
            revelada: this.#revelada
        }
        }
}