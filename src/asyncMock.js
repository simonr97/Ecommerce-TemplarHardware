const products = [
    {
        id: '1',
        name: 'ROG Strix GeForceRTX® 4090 24GB GDDR6X',
        smallDescription: 'ROG Strix GeForce RTX® 4090 24GB GDDR6X diseño mejorado con rendimiento térmico superior.',
        price: 2000,
        category: 'Placa de Video',
        img: 'https://dlcdnwebimgs.asus.com/gain/531CE9CC-1645-4CFB-A5DB-AAD1498845FF/w1000/h732',
        stock: 5,
        description: ['NVIDIA Ada Lovelace Streaming Multiprocessors: Up to 2x performance and power efficiency',
        '4th Generation Tensor Cores: Up to 2X AI performance',
        '3rd Generation RT Cores: Up to 2X ray tracing performance',
        'Axial-tech fans scaled up for 23% more airflow',
        'New patented vapor chamber with milled heatspreader for lower GPU temps',
        '3.5-slot design: massive fin array optimized for airflow from the three Axial-tech fans',
        'Diecast shroud, frame, and backplate add rigidity and are vented to further maximize airflow and heat dissipation',
        'Digital power control with high-current power stages and 15K capacitors to fuel maximum performance',
        'Auto-Extreme precision automated manufacturing for higher reliability',
        'GPU Tweak III software provides intuitive performance tweaking, thermal controls, and system monitoring']    
    },
    {
        id: '2',
        name: 'Ryzen 9 7950X',
        smallDescription: 'Lo mejor para jugar y crear El potente procesador de 16 núcleos puede hacerlo todo para los jugadores y creadores más exigentes.',
        price: 1000,
        category: 'Microprocesador',
        img: 'https://mexx-img-2019.s3.amazonaws.com/Procesador-Amd-Ryzen-9-7950X-5Ghz-AM5-Sin-Cooler_44154_1.jpeg',
        stock: 15,
        description: ['Plataforma: Computadora de escritorio','Familia de productos: AMD Ryzen™ Processors', 'Línea de productos: AMD Ryzen™ 9 Processors', 'N.° de núcleos de CPU: 16', 'N.° de subprocesos: 32', 'Reloj de aumento máx: Hasta 5.7GHz', 'Reloj base: 4.5GHz', 'Caché L1 total: 1MB', 'Caché L2 total: 16MB', 'Caché L3 total: 64MB', 'TDP/TDP predeterminado: 170W', 'Processor Technology for CPU Cores: TSMC 5nm FinFET', 'Desbloqueados: Sí', 'Paquete: AM5', 'Solución térmica: Not included', 'Temp. máx: 95°C', 'Launch Date: 27/9/2022'],
    },
    {
        id: '3',
        name: 'ASUS ROG Crosshair X670E Extreme',
        price: 1000,
        category: 'Motherboard',
        img: 'https://media.ldlc.com/r1600/ld/products/00/05/98/15/LD0005981515.jpg',
        stock: 25,
        description: ['AMD Socket AM5(LGA 1718) for AMD Ryzen 7000 Series Desktop Processors.', '4 x DIMM, Max. 128GB, DDR5 - 6400+(OC)/ 6200(OC)/ 6000(OC)/ 5800(OC)/ 5600/ 5400/ 5200/ 5000', 'Intelligent Control: ASUS-exclusive tools including AI Cooling II, AI Networking, and Two-Way AI Noise-Cancelation for easy configuration.', 'Robust Power Solution: 20 + 2 teamed power stages rated for 110 A, MicroFine alloy chokes, premium metallic capacitors, and ProCool II power connectors.', 'Optimized Thermal Design: Large VRM heatsinks plus integrated aluminum I/O cover, ROG GEN-Z.2, high-conductivity thermal pad, five M.2 heatsinks, and dual M.2 with embedded backplates, and ROG Water-Cooling Zone.', 'High-Performance Networking: Onboard Wi-Fi 6E, Marvell AQtion 10Gb, Intel 2.5Gb Ethernet, and ASUS LANGuard.', 'Ultra-fast Connectivity: PCIe 5.0, Gen 5 M.2 slots, USB 3.2 Gen 2x2 front-panel header, USB4 ports.', 'Industry Leading Immersive Audio: ROG SupremeFX ALC4082 codec withESS ES9218 QUAD DAC.']    
    },
    {
        id: '4',
        name: 'ROG-THOR-1000P2-GAMING',
        price: 275,
        category: 'Fuente',
        img: 'https://dlcdnwebimgs.asus.com/gain/F40C3AEA-D458-41E6-BF27-045C0C8D5086/w717/h525',
        stock: 8,
        description: ['La Certificación Lambda A++ confirma que la fuente de poder Thor ejerce un poder amenazante en absoluto sigilo.', 'Los disipadores térmicos ROG cubren los componentes críticos y ofrecen temperaturas más bajas y menos ruido.', 'Un ventilador Axial-tech de 135 mm con control PWM genera menos ruido y mantiene las temperaturas bajo control.', 'Construido con capacitores de baja ESR y otros componentes premium para lograr la certificación 80 Plus Platinum.', 'La Pantalla OLED supervisa el consumo de energía en tiempo real.', 'La compatibilidad Aura Sync te permite personalizar y sincronizar los efectos de iluminación con otro hardware compatible.']    
    }
]

export const getProducts = () =>{

    return new Promise((res)=>{
        setTimeout(() => {
            res(products)
        }, 500);
    })
}

export const getProductsById = (id) =>{
    return new Promise((res)=>{
        setTimeout(() => {
            res(products.find(prod => prod.id === id))
        }, 500);
    })
}

export const getProductsByCategory = (categoryId) =>{
    return new Promise((res)=>{
        setTimeout(() => {
            res(products.filter(prod => prod.category === categoryId))
        }, 500);
    })
}