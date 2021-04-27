export class ResumoContrachequeEntidade
{
    public Referencia: Date;
    public DataCredito: Date;
    public Bruto: number;
    public Descontos: number;
    public Liquido = this.Bruto - this.Descontos;
}