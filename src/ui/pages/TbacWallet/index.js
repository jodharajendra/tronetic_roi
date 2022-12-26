import React from "react";

const TbacWallet = () => {
    return (
        <div class="page-content">
            <div class="bg-dash-dark-2 py-4">
                <div class="container-fluid">
                    <h2 class="h5 mb-0">
                        {/* <a href="index.html" ><i class="fas fa-arrow-left me-2" ></i></a> */}
                        NSDT Wallet
                    </h2>
                </div>
            </div>
            <div class="container-fluid py-2">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 py-3 px-0">
                        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">My Account</li>
                        <li class="breadcrumb-item active" aria-current="page">NSDT Wallet</li>
                    </ol>
                </nav>
            </div>
        </div>
    )
}

export default TbacWallet;