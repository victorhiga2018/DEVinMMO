import { ErrorMessage, Field, Form, Formik, FormikContext } from "formik"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react/cjs/react.development"
import { fetchAllDet } from "../services/card-services"
import { ArticleDJ, ButtonForm, ButtonThemeDet, ButtonVoltar, ImgDJ, ImgsDJ, MainDJ, Nav, PDescDetDJ, PDescDJ, PDJ, PTituloDetDJ, PTituloDJ, SectionComent, SectionComentError, SectionComentError2, SectionDetDJ, SectionDivDJ, SectionImgDJ, SectionImgs, SectionNomeEmail, SectionPDJ, SectionReqDivDJ, SectionReqDJ, SectionTDescDJ, SectionUsuario } from "../styles/TelaDetalheDoJogo.styles"
import * as Yup from 'yup'
import { Comentario } from "../comentario/Comentario"
import { useContext } from "react"
import { Context } from "../routes/Router"
import { ThemeProvider } from "styled-components"
import { Theme } from "../tema/Theme"

export const TelaDetalheDoJogo = () => {
    const [detalhes, setDetalhes] = useState([])
    const [galeria, setGaleria] = useState([])
    const [requisitos, setRequisitos] = useState([])
    const [slideshow, setSlideshow] = useState(0)
    const [comentarios, setComentarios] = useState([])
    const comentario = comentarios
    const { temaDark, setTemaDark } = useContext(Context)
    const navigate = useNavigate()

    var { id } = useParams()

    useEffect(() => {
        (async () => {
            const valoresRecebidos = await fetchAllDet(id)
            setDetalhes(valoresRecebidos)

            const imagens = valoresRecebidos.screenshots
            setGaleria(imagens)

            const requisitos = valoresRecebidos.minimum_system_requirements
            setRequisitos(requisitos)

            setSlideshow(imagens[0].image)
            /* RECEBENDO OS DADOS DO LOCASTORAGE */
        })()
    }, [])

    useEffect(() => {
        const fetchComents = JSON.parse(localStorage.getItem(`comentario: ${id}`))
        console.log(fetchComents)
        setComentarios(fetchComents === null ? [] : fetchComents)
    }, [])


    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
            setSubmitting(false)
            comentario.push(values)
            localStorage.setItem(`comentario: ${id}`, JSON.stringify(comentario))

            const fetchComents = JSON.parse(localStorage.getItem(`comentario: ${id}`))
            setComentarios(fetchComents === null ? [] : fetchComents)

            resetForm()

        }, 1000)
    }

    const schema = Yup.object().shape({
        nome: Yup.string().required('Nome obrigat??rio!'),
        email: Yup.string().email('E-mail inv??lido!').required('E-mail obrigat??rio!'),
        comentario: Yup.string().required('Coment??rio obrigat??rio!')
    })

    return (
        <>
            <ThemeProvider theme={Theme}>
                <Nav dark={temaDark}>DEVinMMO</Nav>
                <MainDJ>
                    <ArticleDJ>
                        <SectionPDJ>
                            <PDJ>{detalhes.title}</PDJ>
                            <ButtonThemeDet dark={temaDark} onClick={() => temaDark === false ?
                                setTemaDark(true) : setTemaDark(false)}>{!temaDark ? 'Tema escuro' : 'Tema claro'}</ButtonThemeDet>
                            <ButtonVoltar dark={temaDark} onClick={() => navigate(-1)}>Voltar</ButtonVoltar>
                        </SectionPDJ>

                        <SectionImgDJ>
                            <ImgDJ src={slideshow} />
                        </SectionImgDJ>
                        <SectionImgs>

                            {

                                galeria.map(value =>
                                    <ImgsDJ key={value.id} onClick={() => setSlideshow(value.image)} src={value.image} />
                                )
                            }

                        </SectionImgs>
                        <SectionDivDJ>
                            <SectionTDescDJ>
                                <PTituloDJ>
                                    Genero
                                </PTituloDJ>
                                <PDescDJ>
                                    {detalhes.genre}
                                </PDescDJ>
                            </SectionTDescDJ>

                            <SectionTDescDJ>
                                <PTituloDJ>
                                    Plataform
                                </PTituloDJ>
                                <PDescDJ>
                                    {detalhes.platform}
                                </PDescDJ>
                            </SectionTDescDJ>
                        </SectionDivDJ>
                        <SectionDetDJ>
                            <PTituloDJ>
                                Descri????o
                            </PTituloDJ>
                            <PDescDJ>
                                {detalhes.short_description}
                            </PDescDJ>
                        </SectionDetDJ>
                        <SectionReqDJ dark={temaDark}>
                            <PTituloDJ>
                                Requisitos do Sistema
                            </PTituloDJ>
                            <SectionReqDivDJ>
                                <PTituloDetDJ>
                                    Sistema Operacional:
                                </PTituloDetDJ>
                                <PDescDetDJ>
                                    {requisitos.os}
                                </PDescDetDJ>

                            </SectionReqDivDJ>
                            <SectionReqDivDJ>
                                <PTituloDetDJ>
                                    Processador:
                                </PTituloDetDJ>
                                <PDescDetDJ>
                                    {requisitos.processor}
                                </PDescDetDJ>

                            </SectionReqDivDJ>
                            <SectionReqDivDJ>
                                <PTituloDetDJ>
                                    Mem??ria:
                                </PTituloDetDJ>
                                <PDescDetDJ>
                                    {requisitos.memory}
                                </PDescDetDJ>

                            </SectionReqDivDJ>
                            <SectionReqDivDJ>
                                <PTituloDetDJ>
                                    Gr??ficos:
                                </PTituloDetDJ>
                                <PDescDetDJ>
                                    {requisitos.graphics}
                                </PDescDetDJ>

                            </SectionReqDivDJ>
                            <SectionReqDivDJ>
                                <PTituloDetDJ>
                                    Espa??o em disco:
                                </PTituloDetDJ>
                                <PDescDetDJ>
                                    {requisitos.storage}
                                </PDescDetDJ>
                            </SectionReqDivDJ>
                        </SectionReqDJ>

                        <SectionUsuario>
                            <PTituloDJ>Coment??rios</PTituloDJ>
                        </SectionUsuario>

                        <Formik initialValues={{ nome: '', email: '', curtidas: '0', comentario: '' }} onSubmit={handleSubmit} validationSchema={schema}>
                            {({ isSubmitting, resetForm, isValid }) => (
                                <Form >
                                    <SectionComent>
                                        <Field name='nome' placeholder='Nome' />

                                        <Field name='email' placeholder='Email' />
                                    </SectionComent>

                                    <SectionComentError>
                                        <SectionComent>
                                            <ErrorMessage name="nome" />
                                        </SectionComent>
                                        <SectionComent>
                                            <ErrorMessage name="email" />
                                        </SectionComent>

                                    </SectionComentError>

                                    <SectionComent>
                                        <Field component="textarea" id='comentario' name='comentario' placeholder='Coment??rio' />
                                    </SectionComent>
                                    <SectionComentError2>
                                        <ErrorMessage name="comentario" />
                                    </SectionComentError2>

                                    <SectionComent>
                                        <ButtonForm type="submit" disabled={isSubmitting || !isValid}>Comentar</ButtonForm>
                                    </SectionComent>
                                </Form>
                            )}

                        </Formik>
                        {
                            comentarios.lenght !== 0 ?
                                comentarios.map((value) =>
                                    <Comentario key={comentarios.nome} valor={value} id={id} />
                                ) :
                                <p>Sem comentarios!</p>
                        }
                    </ArticleDJ>
                </MainDJ>
            </ThemeProvider>
        </>

    )
}