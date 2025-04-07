import { useEffect, useMemo, useState } from "react"
import { useAuth } from "../../auth/auth"
import { ROLES } from "../../constants/roles"
import Storage from "../../storage/app-storage.js"
import { useNavigate } from "react-router"
import { validateTechForm, validateUserForm } from "../../utils/form-validation.js"
import { mapperUserToDb } from "../../mappers/user.mapper.js"
import { PRIVATE_ROUTES } from "../../constants/routes.js"
import { mapperTechToDb } from "../../mappers/tech.mapper.js"
import { colors } from "../../constants/colors.js"
import { ReactIcons } from "../../components/ReactIcons.jsx"
import { Button } from "../../components/Button.jsx"
import { LeafLetMap } from "../../components/private/LeafLetMap.jsx"

export function ProfilePage () {

    const navigate = useNavigate();

    const { user } = useAuth()
    const [userType, setUserType] = useState(null);
    const [tech, setTech] = useState(null)

    const [professions, setProfessions] = useState([]);
        const [professionsError, setProfessionsError] = useState('');
        const [provinces, setProvinces] = useState([]);
        const [provincesError, setProvincesError] = useState('');
        const [avatarUrl, setAvatarUrl] = useState(null);
    
        const [name, setName] = useState('');
        const [nameError, setNameError] = useState('');
        const [lastName, setLastName] = useState('');
        const [lastNameError, setLastNameError] = useState('');
        const [phone, setPhone] = useState('');
        const [phoneError, setPhoneError] = useState('');
        const [userName, setUserName] = useState('');
        const [userNameError, setUserNameError] = useState('');
        const [email, setEmail] = useState('');
        const [emailError, setEmailError] = useState('');
        const [password, setPassword] = useState('');
        const [passwordError, setPasswordError] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [confirmPasswordError, setConfirmPasswordError] = useState('')
    
        const [businessName, setBusinessName] = useState('');
        const [businessNameError, setBusinessNameError] = useState('');
        const [businessPhone, setBusinessPhone] = useState('');
        const [businessPhoneError, setBusinessPhoneError] = useState('');
        const [professionsSelected, setProfessionsSelected] = useState([]);
        const [service, setService] = useState('');
        const [serviceError, setServiceError] = useState('');
        const [servicesSelected, setServicesSelected] = useState([]);
        const [provinceSelected, setProvinceSelected] = useState('');
        const [sector, setSector] = useState('');
        const [sectorError, setSectorError] = useState('');
        const [location, setLocation] = useState(null);
        const [locationError, setLocationError] = useState('');

    useEffect(() => {

        console.log(tech);

        const fetchTechData = async () => {
                    const techFetched = await Storage.getTechById(user.id)
                    if(techFetched) {
                        setTech(techFetched)
                    } else {
                        console.error('Error fetching tech data')
                    }

                    setBusinessName(tech?.businessName)
                    setBusinessPhone(tech?.businessPhone)
                    setProfessionsSelected(tech?.professions)
                    setServicesSelected(tech?.services)
                    setProvinceSelected(tech?.province)
                    setSector(tech?.sector)
                    setLocation(tech?.location)
                }

        const fetchProfessions = async () => {
                    const professions = await Storage.getProfessions()
                    if (professions) {
                        setProfessions(professions)
                    } else {
                        console.error('Error fetching professions')
                    }
                }
        
                const fetchProvinces = async () => {
                    const provinces = await Storage.getProvinces()
                    if (provinces) {
                        setProvinces(provinces)
                    } else {
                        console.error('Error fetching provinces')
                    }
                }
    
                setAvatarUrl(Storage.getRandomAvatar())

            if(user) {
                if(user.role === ROLES.TECH) {
                    setUserType(user.role)
                    setName(user.name)
                    setLastName(user.lastName)
                    setUserName(user.userName)
                    setEmail(user.email)
                    setPhone(user.phone)
                    setAvatarUrl(user.avatarUrl)      
                }
            }
                fetchTechData()
                fetchProvinces()
                fetchProfessions()
    }, [user])
        
        const [passwordVisible, setPasswordVisible] = useState(false);
    
        const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    
        const handleAddService = (e) => {
            e.preventDefault()
            if (service.length > 0) {
                setServicesSelected([...servicesSelected, { name: service }])
                setService('')
            }
        }
    
        const memoizedMap = useMemo(() => <LeafLetMap location={location} setLocation={setLocation} />, [location])
    
        const handleUserSubmit = async (e) => {
            e.preventDefault()
                    const user = {
                        name,
                        lastName,
                        userName,
                        email,
                        phone,
                        password,
                        confirmPassword,
                        avatarUrl
                    }
    
                    const isValid = validateUserForm(user)
    
                    setNameError('')
                    setLastNameError('')
                    setPhoneError('')
                    setUserNameError('')
                    setEmailError('');
                    setPasswordError('');
                    setConfirmPasswordError('');
    
                    if(password !== confirmPassword) {
                        setConfirmPasswordError('Las contraseñas no coinciden')
                        return
                    }
    
                    if(!isValid.success) {
                        isValid.error.errors.forEach((error) => {
                            switch(error.path[0]) {
                                case 'name':
                                    setNameError(error.message)
                                    break;
                                case 'lastName':
                                    setLastNameError(error.message)
                                    break;
                                case 'phone':
                                    setPhoneError(error.message)
                                    break;
                                case 'username':
                                    setUserNameError(error.message)
                                    break;
                                case 'email':
                                    setEmailError(error.message)
                                    break;
                                case 'password':
                                    setPasswordError(error.message)
                                    break;
                                case 'confirmPassword':
                                    setConfirmPasswordError(error.message)
                                    break;
                                default:
                                    break;
                            }
                            })
                        }
    
                    if(isValid.success) {
                        const { name, lastName, userName, email, phone, password, avatarUrl } = user;
                        const newSignup = {
                            email,
                            password
                        }
    
                        const userData = mapperUserToDb({ name, lastName, userName, email, phone, avatarUrl, role: ROLES.USER })
    
                        const data = await Storage.signUp(newSignup);
    
                        if(data) {
                            const user = await Storage.createNewUser(userData);
    
                            if(!user) {
                                console.error("Error creating user")
                                return
                            }
    
                            if(user ){
                                navigate(PRIVATE_ROUTES.DASHBOARD.PATH)
                            }
                        }
                    }
        }
    
        const handleTechSubmit = async (e) => {
            e.preventDefault();
            const tech = {
                name,
                lastName,
                userName,
                email,
                phone,
                password,
                confirmPassword,
                businessName,
                businessPhone,
                professions: professionsSelected,
                services: servicesSelected,
                province: provinceSelected,
                sector,
                location: [location],
                avatarUrl,
            }
    
            const isValid = validateTechForm(tech);
    
            setNameError('')
            setLastNameError('')
            setPhoneError('')
            setUserNameError('')
            setEmailError('')
            setPasswordError('')
            setConfirmPasswordError('')
            setBusinessNameError('')
            setBusinessPhoneError('')
            setProfessionsError('')
            setServiceError('')
            setProvincesError('')
            setSectorError('')
            setLocationError('')
    
            if(password !== confirmPassword) {
                        setConfirmPasswordError('Las contraseñas no coinciden')
                        return
                    }
    
                    if(!isValid.success) {
                        isValid.error.errors.forEach((error) => {
                            switch(error.path[0]) {
                                case 'name':
                                    setNameError(error.message)
                                    break;
                                case 'lastName':
                                    setLastNameError(error.message)
                                    break;
                                case 'phone':
                                    setPhoneError(error.message)
                                    break;
                                case 'username':
                                    setUserNameError(error.message)
                                    break;
                                case 'email':
                                    setEmailError(error.message)
                                    break;
                                case 'password':
                                    setPasswordError(error.message)
                                    break;
                                case 'confirmPassword':
                                    setConfirmPasswordError(error.message)
                                    break;
                                case 'businessName':
                                    setBusinessNameError(error.message)
                                    break;
                                case 'businessPhone':
                                    setBusinessPhoneError(error.message)
                                    break;
                                case 'professions':
                                    setProfessionsError(error.message)
                                    break;
                                case 'services':
                                    setServiceError(error.message)
                                    break;
                                case 'province':
                                    setProvincesError(error.message)
                                    break;
                                case 'sector':
                                    setSectorError(error.message)
                                    break;
                                case 'location':
                                    setLocationError(error.message)
                                    break;
                                default:
                                    break;
                            }
                            })
                        }
    
                        if(isValid.success) {
                        const { name, lastName, userName, email, phone, password, businessName, businessPhone, professions, services, province, sector, location, avatarUrl } = tech;
                        const newSignup = {
                            email,
                            password
                        }
    
                        const userData = mapperUserToDb({ name, lastName, userName, email, phone, avatarUrl, role: ROLES.TECH })
    
                        const techData = mapperTechToDb({ businessName, businessPhone, professions, services, province, sector, location })
    
                        const data = await Storage.signUp(newSignup);
    
                        if(data) {
                            const tech = await Storage.createNewTech(userData, techData);
    
                            if(!tech) {
                                console.error("Error creating tech")
                                return
                            }
    
                            if(tech) {
                                navigate(PRIVATE_ROUTES.DASHBOARD.PATH)
                            }
                        }
                    }
    
        }

    return (
        <>
            <div className="w-full flex flex-col gap-15 p-4 overflow-y-auto">
                <header className="w-full flex justify-between items-center">
                    <h1 className="font-bold text-2xl">Mi Perfil</h1>
                </header>
                <section className="flex flex-col gap-6 items-center justify-center w-xl">
                            <form className="w-full flex flex-col gap-6">
                                <div className="flex flex-col md:flex-row gap-6 w-full justify-between itemns-center">
                                    <div className="flex flex-col gap-2 w-full">
                                    <label className="text-lg md:text-xl font-bold">Nombre <span className="text-red-600 text-sm">*</span></label>
                                    <input onChange={(e) => setName(e.target.value)} className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="John" value={name} type="text" />
                                    <span className="text-red-600 text-xs h-1">{nameError}</span>
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <label className="text-lg md:text-xl font-bold">Apellido <span className="text-red-600 text-sm">*</span></label>
                                    <input onChange={(e) => setLastName(e.target.value)} className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="Doe" type="text" value={lastName} />
                                    <span className="text-red-600 text-xs h-1">{lastNameError}</span>
                                </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-6 w-full justify-between itemns-center">
                                    <div className="flex flex-col gap-2 w-full">
                                    <label className="text-lg md:text-xl font-bold">Nombre de usuario <span className="text-red-600 text-sm">*</span></label>
                                    <input onChange={(e) => setUserName(e.target.value)} className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="nombreusuario" type="text" value={userName} readOnly={true} />
                                    <span className="text-red-600 text-xs h-1">{userNameError}</span>
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <label className="text-lg md:text-xl font-bold">Teléfono celular <span className="text-red-600 text-sm">*</span></label>
                                    <input onChange={(e) => setPhone(e.target.value)} className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="0000000000" type="number" value={phone} />
                                    <span className="text-red-600 text-xs h-1">{phoneError}</span>
                                </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-lg md:text-xl font-bold">Correo electrónico <span className="text-red-600 text-sm">*</span></label>
                                    <input onChange={(e) => setEmail(e.target.value)} className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="example@correo.com" type="email" value={email} readOnly={true} />
                                    <span className="text-red-600 text-xs h-1">{emailError}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-lg md:text-xl font-bold">Contraseña <span className="text-red-600 text-sm">*</span></label>
                                    <div className="flex items-center bg-light rounded-lg border border-primary justify-between p-2">
                                        <input onChange={(e) => setPassword(e.target.value)} className="outline-none text-lg placeholder:opacity-80 w-full" placeholder="***********" type={passwordVisible ? "text" : "password"} />
                                        {passwordVisible ? <ReactIcons onClick={() => setPasswordVisible(!passwordVisible)} iconClass={"cursor-pointer"} color={colors.primary} name={"eyeSlash"} size={25} /> : <ReactIcons onClick={() => setPasswordVisible(!passwordVisible)} iconClass={"cursor-pointer"} color={colors.primary} name={"eye"} size={25} />}
                                    </div>
                                    <span className="text-red-600 text-xs h-1">{passwordError}</span>
                                </div>
                                <div className="flex flex-col gap-2 w-full">
                                    <label className="text-lg md:text-xl font-bold">Confirmar contraseña <span className="text-red-600 text-sm">*</span></label>
                                    <div className="flex items-center bg-light rounded-lg border border-primary justify-between p-2">
                                        <input onChange={(e) => setConfirmPassword(e.target.value)} className="outline-none text-lg placeholder:opacity-80 w-full" placeholder="***********" type={confirmPasswordVisible ? "text" : "password"} />
                                        {confirmPasswordVisible ? <ReactIcons onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} iconClass={"cursor-pointer"} color={colors.primary} name={"eyeSlash"} size={25} /> : <ReactIcons onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} iconClass={"cursor-pointer"} color={colors.primary} name={"eye"} size={25} />}
                                    </div>
                                    <span className="text-red-600 text-xs h-1">{confirmPasswordError}</span>
                                </div>
                
                                {userType === ROLES.TECH && (
                                    <>
                                    <div className="flex flex-col md:flex-row gap-4 w-full items-center justify-between">
                                    <div className="flex flex-col gap-2 w-full">
                                    <label className="text-lg md:text-xl font-bold">Nombre de la Empresa</label>
                                    <input onChange={(e) => setBusinessName(e.target.value)} type="text" placeholder="Empresa 1" className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" value={businessName} />
                                    <span className="text-red-600 text-xs h-1">{businessNameError}</span>
                                    </div>
                
                                    <div className="flex flex-col gap-2 w-full">
                                        <label className="text-lg md:text-xl font-bold">Teléfono de la Empresa</label>
                                        <input onChange={(e) => setBusinessPhone(e.target.value)} className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" placeholder="0000000000" type="number" value={businessPhone} />
                                        <span className="text-red-600 text-xs h-1">{businessPhoneError}</span>
                                    </div>
                                    </div>
                
                                    <div className="flex flex-col gap-2 w-full">
                                        <label className="text-lg md:text-xl font-bold">Profesiones</label>
                                        <div className="p-1 text-lg bg-light rounded-lg border border-primary h-12 flex gap-2">
                                            {professionsSelected?.length > 0 &&
                                            professionsSelected.map((profession) => (
                                                    <div className={`flex items-center justify-center px-1 gap-2 w-max overflow-hidden bg-cyan-100 text-cyan-700`} key={profession.id} id={profession.id}>
                                                        <span className="w-full truncate">{profession.name}</span>
                                                        <ReactIcons onClick={() => setProfessionsSelected(professionsSelected.filter(item => item.id !== profession.id))} name={"close"} size={20} />
                                                    </div>
                                                ))}
                                        </div>
                                        <select className="outline-none p-2 text-lg bg-light rounded-lg border border-primary" onChange={(e) => {
                                            setProfessionsSelected([...professionsSelected, professions.find(profession => profession.id === parseInt(e.target.value))])
                                        }}>
                                            <option value="0">Selecciona una professión</option>
                                            {professions.map((profession) => {
                                                if(!professionsSelected?.includes(profession)) {
                                                    return (
                                                        <option value={profession.id} key={profession.id}>
                                                            {profession.name}
                                                        </option>
                                                    )
                                                }
                                            })}
                                        </select>
                                        <span className="text-red-600 text-xs h-1">{professionsError}</span>
                                    </div>
                
                                     <div className="flex flex-col gap-2 w-full">
                                        <label className="text-lg md:text-xl font-bold">Servicios</label>
                                        <div className="p-1 text-lg bg-light rounded-lg border border-primary h-12 flex gap-2">
                                            {servicesSelected?.length > 0 &&
                                            servicesSelected.map((service, index) => (
                                                    <div className={`flex items-center justify-center px-1 gap-2 w-max overflow-hidden bg-cyan-100 text-cyan-700`} key={index}>
                                                        {service.name}
                                                        <ReactIcons onClick={() => setServicesSelected(servicesSelected.filter(item => item.name !== service.name))} name={"close"} size={20} />
                                                    </div>
                                                ))}
                                        </div>
                                        <div className="flex w-full justify-between text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary overflow-hidden">
                                            <input onChange={(e) => setService(e.target.value)} value={service} type="text" placeholder="Reparaciones" className="flex grow outline-none p-2 text-lg placeholder:opacity-80" />
                                            <button onClick={handleAddService} className="cursor-pointer bg-primary text-secondary px-4">Agregar</button>
                                        </div>
                                        <span className="text-red-600 text-xs h-1">{serviceError}</span>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-4 w-full items-center justify-between">
                                    <div className="flex flex-col gap-2 w-full">
                                    <label className="text-lg md:text-xl font-bold">Provincia</label>
                                    <select className="outline-none p-2 text-lg bg-light rounded-lg border border-primary" onChange={(e) => setProvinceSelected(e.target.value)}>
                                        <option value="0">Selecciona una provincia</option>
                                        {provinces.map((province) => (
                                            provinceSelected === province.id ?
                                            <option value={province.id} key={province.id} selected>
                                                {province.name}
                                            </option>
                                            :
                                            <option value={province.id} key={province.id}>
                                                {province.name}
                                            </option>
                                        ))}
                                    </select>
                                    <span className="text-red-600 text-xs h-1">{provincesError}</span>
                                    </div>
                
                                    <div className="flex flex-col gap-2 w-full">
                                        <label className="text-lg md:text-xl font-bold">Sector</label>
                                        <input onChange={(e) => setSector(e.target.value)} type="text" placeholder="Sector 1, Calle principal" className="outline-none p-2 text-lg placeholder:opacity-80 bg-light rounded-lg border border-primary" value={sector} />
                                        <span className="text-red-600 text-xs h-1">{sectorError}</span>
                                    </div>
                                    </div>
                
                                    <div className="flex flex-col gap-2 w-full">
                                        <label className="text-lg md:text-xl font-bold">Elige la Ubicación de la Empresa</label>
                                        {memoizedMap}
                                        <span className="text-red-600 text-xs h-1">{locationError}</span>
                                    </div>
                                    </>
                                )}
                            </form>
                            <Button handleClick={userType === ROLES.USER ? handleUserSubmit : handleTechSubmit} model="dark" size={'w-full'} text={'Actualizar Datos'}  />
                    </section>
            </div>
        </>
    )
}